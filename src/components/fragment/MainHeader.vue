<template>
    <div class="p-5 vertigo_top_nav w-full justify-between flex border_divider border-b-2 items-center pb-3">
        <slot name="title"></slot>
        <div class="user flex">
            <object data="../../../src/assets/icons/notification.svg" class="mx-2"></object>
            <object data="../../../src/assets/icons/full.svg" class="mx-2"></object>
            <div class="avatar online">
                <div class=" w-10  rounded-full">
                    <img src="../../../src/assets/images/avatar/avatar.png" />
                </div>
            </div>
            <object data="../../../src/assets/icons/settings.svg" class="mx-2"></object>
        </div>
    </div>
</template>