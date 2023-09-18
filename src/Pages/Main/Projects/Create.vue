<template>
    <SectionVue>
        <div class="project_main_info">
            <div class="w-full col-span-2 card-body bg-dark-300 rounded-md p-4 blind-chart">
                <h2 class="font-bold">Project Informations</h2>
                <div class="form-group">
                    <label class=" my-3 block text-v_13 font-bold" for="projectname">
                        Project Name
                    </label>
                    <p class="mb-1 project_name error_name error"></p>
                    <input id="projectname" type="email" placeholder="Amazing Name" class="form-control p-3 bg-dark-400 w-[50%]" ref="" v-model="project.name">
                </div>
                <div class="form-group">
                    <label class=" my-3 block text-v_13 font-bold" for="projectdescription">
                        Project Description
                    </label>
                    <p class="mb-1 project_name error_description error"></p>
                    <textarea id="projectdescription" placeholder="Amazing Description" rows="10" class="form-control p-3 bg-dark-400 w-full" ref="" v-model="project.description"></textarea>
                </div>

                <!-- ========== Start Accessable Members ========== -->
                <div class="form-group">
                    <label class=" my-3 block text-v_13 font-bold" for="projectdescription">
                        Accessable Members 
                    </label>
                    <p class="mb-1 project_name error_accessable_members error"></p>
                    <input type="text" class="form-control p-3 bg-dark-400 w-[50%]" placeholder="Search members" v-model="search.name" @input="SearchUser()">
                    <div class="member-container h-48 overflow-y-scroll w-[50%]">
                        <div class="member" v-for="member in members" :key="member.id" v-if="!loader">
                            <div class="member flex justify-between">
                                <SelectMember :member="member" :class="{'disabled_div': inActiveCards.indexOf(member.id) > -1}" class="position-relative">
                                    <template #name>
                                        {{ ShortNameAttr(member.name) }}
                                    </template>
                                    <template #email>
                                        {{ member.email }}
                                    </template>
                                </SelectMember>
                                <button class="btn btn-primary m-3" @click="addMember(member.id)" v-if="SelectMembers.findIndex((x) => x.user_id == member.id)">
                                    <span>Select</span>
                                </button>
                                <button class="btn btn-primary m-3" @click="removeMember(member.id)" v-else>
                                    <span>Selected</span>
                                </button>
                            </div>
                            <div class="member_privaledge flex"  v-if="SelectMembers.findIndex((x) => x.user_id == member.id) > -1">
                                <div class="form-control" >
                                    <label class="label cursor-pointer">
                                        <input :id="'read'+member.id" type="radio" :name="'member'+member.id" class="radio checked:bg-blue-500"  value="1" @change="changePermission(member.id,1)" v-model="SelectMembers[SelectMembers.findIndex((x) => x.user_id == member.id)].permission"/>
                                        <label class="label-text mx-2" :for="'read'+member.id">Read only</label> 
                                    </label>
                                </div>
                                <div class="form-control">
                                    <label class="label cursor-pointer">
                                        <input :id="'read_write'+member.id"  type="radio" :name="'member'+member.id" class="radio checked:bg-blue-500" value="2" @change="changePermission(member.id,2)" v-model="SelectMembers[SelectMembers.findIndex((x) => x.user_id == member.id)].permission"/>
                                        <label class="label-text mx-2" :for="'read_write'+member.id">Read and write</label> 
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="loading-container w-full my-2 flex justify-center" v-if="loader">
                            <div class="loading"></div>
                            <span class="block  text-v_13 mx-2">Searching</span>
                        </div>
                    </div>
                </div>
                <!-- ========== End Accessable Members ========== -->
                

                <!-- ========== Start Form Builder ========== -->
                <div class="formb-builder">
                    <label class=" my-3 block text-v_13 font-bold" for="projectdescription">
                        Porject form 
                    </label>
                    <p class="mb-1 project_form error_inputs error"></p>
                    <div class="grid grid-cols-12">
                        <div class="inputs col-span-2 ">
                            <div class="mb-4 select-none cursor-grab" draggable="true" @dragstart="addDraggingData($event,'text')">
                                <div class="input bg-dark-400 shadow-lg flex items-center rounded-lg w-full" type="text">
                                    <img src="@assets\images\builder\text.png" width="40">
                                    <p class="mb-0 flex align-middle text-v_15 font-bold mx-2">Text</p>
                                </div>
                            </div>
                            <div class="mb-4 select-none cursor-grab" draggable="true" @dragstart="addDraggingData($event,'number')">
                                <div class="input bg-dark-400 shadow-lg flex items-center rounded-lg w-full" type="text">
                                    <img src="@assets\images\builder\123.png" width="30">
                                    <p class="mb-0 flex align-middle text-v_15 font-bold mx-2">Numbers</p>
                                </div>
                            </div>
                            <div class="mb-4 select-none cursor-grab"  draggable="true" @dragstart="addDraggingData($event,'textarea')">
                                <div class="input bg-dark-400 shadow-lg flex items-center rounded-lg w-full" type="text">
                                    <img src="@assets\images\builder\textarea.png" width="30">
                                    <p class="mb-0 flex align-middle text-v_15 font-bold mx-2">Textarea</p>
                                </div>
                            </div>
                            <div class="mb-4 select-none cursor-grab" draggable="true" @dragstart="addDraggingData($event,'dateandtime')">
                                <div class="input bg-dark-400 shadow-lg flex items-center rounded-lg w-full" type="text">
                                    <img src="@assets\images\builder\schedule.png" width="30">
                                    <p class="mb-0 flex align-middle text-v_15 font-bold mx-2">Date time</p>
                                </div>
                            </div>
                            <div class="mb-4 select-none cursor-grab" draggable="true" @dragstart="addDraggingData($event,'date')">
                                <div class="input bg-dark-400 shadow-lg flex items-center rounded-lg w-full" type="text">
                                    <img src="@assets\images\builder\calendar.png" width="25" height="40">
                                    <p class="mb-0 flex align-middle text-v_15 font-bold mx-2">Date</p>
                                </div>
                            </div>
                            <div class="mb-4 select-none cursor-grab" draggable="true" @dragstart="addDraggingData($event,'radio_collection')">
                                <div class="input bg-dark-400 shadow-lg flex items-center rounded-lg w-full" type="text">
                                    <img src="@assets\images\builder\radio.png" width="25" height="40">
                                    <p class="mb-0 flex align-middle text-v_15 font-bold mx-2">Radio collection</p>
                                </div>
                            </div>
                            <div class="mb-4 select-none cursor-grab" draggable="true" @dragstart="addDraggingData($event,'check_collection')">
                                <div class="input bg-dark-400 shadow-lg flex items-center rounded-lg w-full" type="text">
                                    <img src="@assets\images\builder\check.png" width="25" height="40">
                                    <p class="mb-0 flex align-middle text-v_15 font-bold mx-2">Checkbox collection</p>
                                </div>
                            </div>
                        </div>
                        <div class="forms col-span-10 bg-dark-400 mx-4 rounded-lg drop-zone-container relative z-30"> 
                            <div class="w-full h-full flex justify-center items-center absolute z-10" v-if="formList.length == 0">
                                <img src="@assets/images/builder/plus.png">
                            </div>
                            <div class="drop-zone w-full h-full z-20 absolute top-0 p-4 hidden" @dragenter="dragEnterZone($event)" @dragleave="dragLeaveZone($event)" @dragover="dragOverZone($event)" @drop="dragDropZone($event)">
                                
                            </div>
                            <div class="px-4">
                                <Draggable v-model="formList" tag="ul" class=" min-h-6 " drag-class="drag-card" ghost-class="ghost-class" group="cards" @start="drag=true" @end="drag=false" @update="onUpdate" :item-key="formList.index"  :animation="200">
                                    <template #item="{element: formList}">
                                        <li>
                                            <div class="flex my-4 items-center">
                                                <div class="input-label px-3">
                                                    <input type="text" class="bg-transparent my-3 py-1 px-1 text-v_15 font-bold focus:border-2 border-blue-900" v-model="formList.label">
                                                    <span class=" text-v_12 text-red-500 block px-1 cursor-pointer" @click="removeInput(formList.index)">Delete input</span>
                                                </div>
                                                <input type="text" class="p-3 bg-dark-200 h-10 rounded-lg text-v_12 w-full my-5 my-10" v-if="formList.type == 'text'">
                                                <input type="number" class="p-3 bg-dark-200 h-10 rounded-lg text-v_12 w-full my-10" v-if="formList.type == 'number'">
                                                <textarea type="text" class="p-3 bg-dark-200  rounded-lg text-v_12 w-full my-10" v-if="formList.type == 'textarea'"></textarea>
                                                <input type="date" class="p-3 bg-dark-200 h-10 rounded-lg text-v_12 w-full my-10" v-if="formList.type == 'date'">
                                                <input type="datetime-local" class="p-3 bg-dark-200 h-10 rounded-lg text-v_12 w-full my-10" v-if="formList.type == 'dateandtime'">
                                                <div class="multiable_choise my-10" v-if="formList.type == 'radio_collection'">
                                                    <div class="option flex items-center" v-for="(option,index) in formList.options">
                                                        <input type="radio" class="radio checked:bg-blue-500" :name="'option'+formList.index"/>
                                                        <div class="input-label px-3">
                                                            <input type="text" class="bg-transparent my-3 py-1 px-1 text-v_15 font-bold focus:border-2 border-blue-900 text-v-12" v-model="option.value">
                                                            <span class="text-v_11 text-gray-400 cursor-pointer" @click="removeOption(index,formList.index)" v-if="Object.keys(formList.options).length > 1">- Remove option </span>
                                                        </div>
                                                    </div>
                                                    <span class="text-v_13 font-bold text-gray-500 cursor-pointer" @click="addNewOption(formList.index)">+ Add new option</span>
                                                </div>
                                                <div class="multiable_choise my-10" v-if="formList.type == 'check_collection'">
                                                    <div class="option flex items-center" v-for="(option,index) in formList.options">
                                                        <input type="checkbox" class="radio checked:bg-blue-500" :name="'option'+index"/>
                                                        <div class="input-label px-3">
                                                            <input type="text" class="bg-transparent my-3 py-1 px-1 text-v_15 font-bold focus:border-2 border-blue-900 text-v-12" v-model="option.value">
                                                            <span class="text-v_11 text-gray-400 cursor-pointer" @click="removeOption(index,formList.index)" v-if="Object.keys(formList.options).length > 1">- Remove option </span>
                                                        </div>
                                                    </div>
                                                    <span class="text-v_13 font-bold text-gray-500 cursor-pointer" @click="addNewOption(formList.index)">+ Add new option</span>
                                                </div>
                                            </div>
                                            <div class="flex px-4 my-4">
                                                <div class="mode flex items-center">
                                                    <input :id="'searchable'+formList.index" type="checkbox" class="radio checked:bg-blue-500" value="searchable" v-model="formList.searchable"/>
                                                    <label :for="'searchable'+formList.index" class=" mx-3 block text-v_13 font-bold" for="projectdescription">
                                                        Mark as searchable value
                                                    </label>
                                                </div>
                                                <div class="mode flex items-center">
                                                    <input :id="'latest'+formList.index" type="checkbox" class="radio checked:bg-blue-500" value="latest_value" v-model="formList.view_latest"/>
                                                    <label :for="'latest'+formList.index" class=" mx-3 block text-v_13 font-bold" for="projectdescription">
                                                        View latest values
                                                    </label>
                                                </div>
                                                <div class="mode flex items-center" v-if="formList.type == 'number'">
                                                    <input :id="'avg'+formList.index" type="checkbox" class="radio checked:bg-blue-500" value="latest_value" v-model="formList.record_avg"/>
                                                    <label :for="'avg'+formList.index" class=" mx-3 block text-v_13 font-bold" for="projectdescription">
                                                        Show the avg of records
                                                    </label>
                                                </div>
                                                <div class="mode flex items-center" v-if="formList.type == 'number'">
                                                    <input :id="'total'+formList.index" type="checkbox" class="radio checked:bg-blue-500" value="latest_value" v-model="formList.record_total"/>
                                                    <label :for="'total'+formList.index" class=" mx-3 block text-v_13 font-bold" for="projectdescription">
                                                        Show Total of records
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                    </template>
                            </Draggable>
                            </div>
                            <div class="drop-zone-layer z-30 bg-blue-600 opacity-50 w-full h-full absolute top-0 border-4 border-blue-900 rounded-lg"></div>
                        </div>
                    </div>
                </div>
                <!-- ========== End Form Builder ========== -->
            </div>
            <LoaderButton :loading="projectLoader" class=" w-56 my-11 bg-dark-400 ml-auto" @click="createProject()">
                <template #text>
                    Create new project
                </template>
            </LoaderButton>
        </div>
    </SectionVue>
</template>

<script setup>
// Import Main Components 
import SectionVue from '@/components/fragment/Pages/Section.vue';
import SelectMember from '@/components/fragment/Cards/SelectMember.vue';
import LoaderButton from "@/components/fragment/Buttons/LoaderButton.vue";

// Import Helpers
import validation from "@/Helpers/localization/validation";

// Import Plugins
import Draggable from 'vuedraggable';
import Swal from 'sweetalert2/dist/sweetalert2';

// Import Vue Components
import {onMounted, ref } from 'vue';

// Define Store
import { useMemberStore } from '@/stores/MembersStore';
import { useProjectStore } from '@/stores/ProjectStore';
// Stores Variables
let memberStore  = useMemberStore();
let projectStore = useProjectStore(); 

/*** Project */
let project = ref({
    name: '',
    description: ''
});

let SelectMembers = ref([]);


// Toggle accessable members
function addMember(id) {
    SelectMembers.value.push({user_id: id,permission: 1});
}

function removeMember(id) {
    let index = SelectMembers.value.findIndex((x) => x.user_id == id);
    SelectMembers.value.splice(index,1);
}

function changePermission(id,value) {
    let index = SelectMembers.value.findIndex((x) => x.user_id == id);
    SelectMembers.value[index].permission = value;
}



/*** User Filters */
let loader = ref(true);
let inActiveCards = ref([]);
let loader_interval = ref(null);
let members = ref({});
let search =  ref({
    name: "",
    page: 1
});

function SearchUser() {
    loader.value = true;
    clearTimeout(loader_interval.value);
    loader_interval.value = setTimeout(() => {
        memberStore.getMembers(search.value).then((response) => {
            handlerMembers(response);
        });
    },1000)
}

function handlerMembers(response) {
    members.value = response.data.data.users.data;
    loader.value = false;
}

/*** Drag and drop */
let formList = ref([]);

function addDraggingData(event,type) {
    document.querySelector('.drop-zone').classList.remove("hidden");
    event.dataTransfer.setData("type",type);
}

function dragEnterZone(event) {
    event.preventDefault();
    document.querySelector('.drop-zone').classList.add("active");
}

function dragLeaveZone(event) {
    event.preventDefault();
    document.querySelector('.drop-zone').classList.add("hidden");
    document.querySelector('.drop-zone').classList.remove("active");
}

function dragOverZone(event) {
    event.preventDefault();
}

function dragDropZone(event) {
    event.preventDefault();

    document.querySelector('.drop-zone').classList.remove("active");
    document.querySelector('.drop-zone').classList.add("hidden");

    let type = event.dataTransfer.getData("type")
    let index = Math.floor(Math.random() * (1000000 - 1000 + 1) + 1000000);

    if ( type == 'text' ) {
        formList.value.push({
            index: index,
            sort: formList.value.length + 1,
            searchable: false,
            type: 'text',
            label: `Text label`,
            searchable: false,
            view_latest: false,
        })
    } else if ( type == 'textarea' ) {
        formList.value.push({
            index: index,
            sort: formList.value.length + 1,
            type: 'textarea',
            label: `Textarea label`,
            searchable: false,
            view_latest: false,
        })
    } else if ( type == 'dateandtime' ) {
        formList.value.push({
            index: index,
            sort: formList.value.length + 1,
            type: 'dateandtime',
            label: `Date and time label`,
            searchable: false,
            view_latest: false,
        })
    } else if ( type == 'date' ) {
        formList.value.push({
            index: index,
            sort: formList.value.length + 1,
            type: 'date',
            label: `Date label`,
            searchable: false,
            view_latest: false,
        })
    } else if ( type == 'radio_collection' ) {
        formList.value.push({
            index: index,
            sort: formList.value.length + 1,
            type: 'radio_collection',
            label: `Radio label`,
            searchable: false,
            view_latest: false,
            options: {
                option1: {value: 'Option 1'},
                option2: {value: 'Option 2'},
            },
        })
    } else if ( type == 'check_collection' ) {
        formList.value.push({
            index: index,
            sort: formList.value.length + 1,
            type: 'radio_collection',
            label: `Checkbox label`,
            searchable: false,
            view_latest: false,
            options: {
                option1: {value: 'Option 1'},
                option2: {value: 'Option 2'},
            },
        })
    } else if ( type == 'number' ) {
        formList.value.push({
            index: index,
            sort: formList.value.length + 1,
            type: 'number',
            label: `Numbers label`,
            searchable: false,
            view_latest: false,
            record_total: false,
            record_avg: false,
        })
    } 
}

function removeInput(index) {
    let inputIndex = formList.value.findIndex((x) => x.index == index);
    formList.value.splice(inputIndex,1);
}

function addNewOption(index) {
    let inputIndex  = formList.value.findIndex((x) => x.index == index);
    let optionIndex = Math.floor(Math.random() * (1000000 - 1000 + 1) + 1000000);
    formList.value[inputIndex].options[optionIndex] = {'value': 'Extra option'}
}

function removeOption(index,optionIndex) {
    let optIndex  = formList.value.findIndex((x) => x.index == optionIndex);
    delete  formList.value[optIndex].options[index];
}

function onUpdate(event) {
    for (let i = 0; i < formList.value.length; i++) {
        formList.value[i].sort = i + 1;
    }
}

/*** Create project */ 
let projectLoader = ref(false);

function createProject() {
    let errors = validation({
        name: project.value.name,
        description: project.value.description,
        inputs: formList.value
    },{
        'name': ['required','min:3'],
        'description': ['min:20'],
        'inputs': ['required','min:1']
    },{
        'inputs.min': "Must be at least one input in project form "
    });

    if ( errors.errorsExist ) {
        return false;
    }

    // start loading
    projectLoader.value = true;
    alert(errors.length)
    // Send create request
    projectStore.upsertProject({
        name: project.value.name,
        description: project.value.description,
        accessable_members:  SelectMembers.value,
        inputs: formList.value
    }).then((response) => {
        let errors = response.data.errors;
        let data   = response.data.data.upsertproject;

        // stop loading
        projectLoader.value = false;

        // Display Errors
        if ( errors ) {
            displayErrors(errors[0].extensions.validation);
            
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                icon: "error",
                title: "Failed to create project",
                text: `There were some validation errors found when creating the project.`,
                confirmText: "confirm",
                showCancelButton: false,
                showConfirmButton:false
            })

            return false;
        }
    });
}

function displayErrors(errors) {
    let keys = Object.keys(errors);
    let displayed_keys = [];
    
    // Remove Input from all keys
    keys.forEach((key) => {
        displayed_keys.push(key.replace('input.',''));
    });

    for ( var i = 0; i < displayed_keys.length; i++ ) {
        document.querySelector(`.error_${displayed_keys[i]}`).innerHTML = '';
        document.querySelector(`.error_${displayed_keys[i]}`).innerHTML = errors[keys[i]].join("<br>");
    }
}

onMounted(() => {
    // Get first members on load
    SearchUser();
})

</script>