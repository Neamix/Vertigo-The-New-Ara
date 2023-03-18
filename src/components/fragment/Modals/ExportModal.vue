<template>
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="exportModal" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box relative">
        <label for="exportModal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <h3 class="text-lg font-bold">
            <slot name="header"></slot>
        </h3>
        <slot name="body"></slot>
    </div>
    </div>
</template>