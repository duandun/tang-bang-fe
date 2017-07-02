import { TEXT, LIFECYCLE } from '../constant';
import _ from 'lodash';

const TYPE = {
  BASE: 'isSync',
  FORMLOAD: 'formloading',
  FETCH: 'loading',
  SAVE: 'saving'
};

const PHASE = {
  BEFORE: 0,
  AFTER: 1
};

function updateLifeCycle(type, phase, error, previous) {
  if (type === TYPE.FORMLOAD) {
    if (phase === PHASE.BEFORE) {
      this.lifecycle = LIFECYCLE.LOADING;
    } else if (!error) {
      this.lifecycle = LIFECYCLE.READY;
      this.$nextTick(() => {
        this.rawForm = _.cloneDeep(this.form);

                // if (this.$refs.form) {
                //     this.$refs.form.$on('change', () => {
                //         if (this.isFormChanged()) {
                //             this.lifecycle = LIFECYCLE.CHANGED;
                //         } else {
                //             this.lifecycle = LIFECYCLE.READY;
                //         }
                //     });
                // }
      });
    }
  } else if (type === TYPE.SAVE) {
    if (phase === PHASE.BEFORE) {
      this.lifecycle = LIFECYCLE.SAVING;
    } else if (!error) {
      this.lifecycle = LIFECYCLE.SAVED;
    } else {
      this.lifecycle = previous.lifecycle;
    }
  }
}

function updateState(onOff, phase, error, previous) {
  this[onOff] = phase === PHASE.BEFORE;
  updateLifeCycle.call(this, onOff, phase, error, previous);
}

export function wrapAsync(successMsg, errorMsg) {
  return function(onOff = TYPE.BASE) {
    return function(fn) {
      return function(...args) {
        if (this[onOff]) {
          this.$Message.warning(TEXT.OPERATE_WARNING);
          return;
        }

        updateState.call(this, onOff, PHASE.BEFORE);

        let previous = {
          lifecycle: this.lifecycle
        };

                // 保证开关已经打开
        this.$nextTick(() => {
          fn.apply(this, args).then(resp => {
            updateState.call(this, onOff, PHASE.AFTER);

            if (successMsg && !this.slience) {
              this.$Message.success(successMsg);
            }
          }).catch(resp => {
            updateState.call(this, onOff, PHASE.AFTER, true, previous);

            if (errorMsg) {
              this.$Message.error(errorMsg);
            }
          });
        });
      };
    };
  };
};

export const wrapFormLoad = wrapAsync(null, TEXT.LOAD_ERROR)(TYPE.FORMLOAD);
export const wrapFetch = wrapAsync(null, TEXT.LOAD_ERROR)(TYPE.FETCH);
export const wrapSubmit = wrapAsync(TEXT.SAVE_SUCCESS, TEXT.SAVE_ERROR)(TYPE.SAVE);
export const wrapOperate = wrapAsync(TEXT.OPERATE_SUCCESS, TEXT.OPERATE_ERROR);
