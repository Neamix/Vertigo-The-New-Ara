<template>
    <div class="online flex">
        <div class="flex relative">
            <img src="@assets/images/avatar/avatar.png" class="rounded-full avatar_icon" v-if="user.avatar"/>
            <div class="avatar_icon rounded-full bg-slate-900 flex justify-center items-center" v-if="!user.avatar">
                {{  avatarGravtar()  }}
            </div>
        </div>
    </div>
</template>

<script setup>

/*** Avatar */
let props = defineProps({
    user: Object
});

console.log(props.user.avatar)


function avatarGravtar () {
    let spliting_name = props.user.name.split(' ');
    let max_length    = ( spliting_name.length > 1 ) ? 1 : spliting_name.length; 
    let gravatar_name = "";

    for(var i = 0; i <= max_length; i++ ) {
        gravatar_name += spliting_name[i].slice(0,1);
    }

    return gravatar_name;
}


</script>