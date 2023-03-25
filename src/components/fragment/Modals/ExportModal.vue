<template>
    <!-- Put this part before </body> tag -->
    <slot name="modalname"></slot>
    <div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box relative overflow-y-scroll px-4">
        <label for="inviteModal" class="btn btn-close btn-sm btn-circle absolute right-2 top-2 mx-0 my-2">✕</label>
        <h3 class="text-lg font-bold">
            <slot name="header"></slot>
        </h3>
        <slot name="body"></slot>
    </div>
    </div>
</template>