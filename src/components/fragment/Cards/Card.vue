<template>
    <div class="card p-0">
        <div class="card-body px-4 py-2">
            <h3 class="flex justify-between">
                <slot name="title"></slot>
            </h3>
            <div>
                <slot name="slides"></slot>
            </div>
        </div>
    </div>
</template>