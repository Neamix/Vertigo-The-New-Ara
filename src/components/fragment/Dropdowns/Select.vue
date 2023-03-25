<template>
<div class="dropdown dropdown-hover">
    <label tabindex="0" class="btn m-1 w-full justify-between flex">
        <slot name="label"></slot>
    </label>
    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-secoundry-dark rounded-sm bg-base-100 max-w-md w-full">
       <slot name="options"></slot> 
    </ul>
</div>
</template>

<script>
    export default {
        mounted() {
            let el = document.querySelector( ':focus' );
            if( el ) el.blur();
        }
    }
</script>