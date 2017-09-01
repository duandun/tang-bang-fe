<template>
	<div class="e-layout" :class='shrinked ? "e-layout-shrinked" : ""'>
		<div class="e-layout-header">
			<slot name='header-left'></slot>
			<div class="header-right">
			  <slot name='header-right'></slot>
			</div>
		</div>
		<div class="e-layout-left">
		  <div class="e-layout-logo">
			<slot name='logo'></slot>
		  </div>
		  <slot name='menu'></slot>
		  <!-- <div title='点击收起' class='e-layout-toggle' @click='toggleSidebar'>
			<Icon type="ios-arrow-left"></Icon>
		  </div> -->
		</div>
		<div class="e-layout-content">
		  <div class="e-layout-content-main">
			<slot></slot>
		  </div>
		</div>
		<div class="e-layout-copyright">
		  <slot name='copyright'></slot>
		</div>
	</div>
</template>
<script>
	export default {
		componentName: 'eLayout',
		data() {
			return {
				shrinked: false
			}
		},
		methods: {
			toggleSidebar() {
				this.shrinked = !this.shrinked
				setTimeout(() => {
					if (document.createEvent) {
						let event = document.createEvent('HTMLEvents')
						event.initEvent('resize', true, true)
						window.dispatchEvent(event)
					} else if (document.createEventObject) {
						window.fireEvent('onresize')
					}
				}, 600)
			}
		}
	}
</script>
