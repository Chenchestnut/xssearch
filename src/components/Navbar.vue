<script setup>
import { useInputStore } from '../stores/useInputStore';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import Personal from './Personal.vue';
import HambergerMenu from './HambergerMenu.vue';
const inputStore = useInputStore();
let name = inputStore.text.slice(1);
let isPersonalMenuOpen = ref(false);
let isHambergerMenuOpen = ref(false);
let activeBtn = ref('');
// const icon = [
//     {title:'hamberger',icon:'fa-solid fa-bars'},
//     {title:'close',icon:'fa-solid fa-xmark'},
// ]

function togglePersonalMenu() {
    isPersonalMenuOpen.value = !isPersonalMenuOpen.value;
}
function toggleHambergerMenu() {
    isHambergerMenuOpen.value = !isHambergerMenuOpen.value;
}
function setActive(activeBtn){
    activeBtn.value = activeBtn;
}
function updateActive(){
    const currentPath = route.path
    if(currentPath.includes('/search')) {
        activeBtn.value = 'search';
    } else if(currentPath.includes('/recommend')) {
        activeBtn.value = 'recommend';
    } /*else if(currentPath.includes('/compare')) {
        activeBtn.value = 'compare';
    } */else if(currentPath.includes('/membership')) {
        activeBtn.value = 'membership';
    }
}


onMounted(()=>{
    updateActive();
})
</script>

<template>
    <div class="wholeNavbar">
        <header class="navbar">
            <nav>
                <div class="logo">
                    <img src="../assets/logo.jpeg" alt="LOGO">
                    <router-link to="/" class="brandName">XSSearch</router-link>
                </div>
                <div class="navLinks">
                    <router-link to="/search" class="search" @click="setActive('search')" :class="{active: activeBtn === 'search'}">普通查詢</router-link>
                    <router-link to="/recommend" class="recommend" @click="setActive('recommend')" :class="{active: activeBtn === 'recommend'}">個人化推薦</router-link>
                    <!-- <router-link to="/compare" class="compare">好物比拼<i class="fa-solid fa-crown"></i></router-link>   -->
                    <router-link to="/membership" class="compare" @click="setActive('membership')" :class="{active: activeBtn === 'membership'}">好物比拼<i class="fa-solid fa-crown"></i></router-link>
                </div>
                <div class="personal">
                        <div class="avatar">
                            <!-- <p>{{ name }}</p> -->
                             <i class="fa-regular fa-user"></i>
                        </div>
                        <i class="fa-solid fa-chevron-down" @click="togglePersonalMenu"></i>
                        <div class="component" v-if="isPersonalMenuOpen">
                            <Personal />
                        </div>
                </div>
                <div class="hamber">
                    <i class="fa-solid fa-bars" @click="toggleHambergerMenu"></i>
                    <HambergerMenu v-if="isHambergerMenuOpen" @close="isHambergerMenuOpen = false"/>
                </div>
            </nav>
        </header>
    </div>
    


</template>


<style lang="scss" scoped>
div.wholeNavbar{
    position: sticky;
    top: 0;
    z-index: 1000;
    min-width: 320px;
    header.navbar{
    $word-color: #2F2F2F;
        nav{
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #9aa7b8;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            // margin: 0 5rem 0 5rem;
            padding: 1.5rem 3rem 1.5rem 1rem;
            border-radius: 0 0 35px 35px;
            .logo {
                    display: flex;
                    align-items: center;
                    margin-left: 3rem;
                    margin-right: 0.5rem;

                    img {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        margin-right: 10px;
                        border: 1px solid #B5B8A3;
                    }

                    .brandName {
                        font-size: 1.5rem;
                        font-weight: 300;
                        color: white;
                        cursor: pointer;
                        text-decoration: none;
                    }
            }
            .navLinks{
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #D2D5DA;
                padding: 0.5rem 1.5rem;
                border-radius: 35px;

                .search, .recommend, .compare{
                    margin: 0 1rem;
                    padding: 0.5rem 1rem;
                    color: #2F2F2F;
                    text-decoration: none;
                    font-size: 1.2rem;
                    font-weight: 500;
                    border-radius: 35px;
                    transition: color 0.3s ease;
                    &:hover{
                        background-color: #C4C5B5;
                        
                    }
                }
                i{
                    position: absolute;
                    rotate: 30deg;
                    top: 1.75rem;
                    color: #d88f8a;
                    font-size: 1rem;
                }
            }
            .personal{
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                    .avatar{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 60px;
                        height: 60px;
                        background-color: #B5B8A3;
                        border-radius: 50%;
                        margin-right: 0.5rem;
                        p{
                            color: $word-color;
                            text-align: center;
                            font-size: 1.5rem;
                        }
                    }
                    i{
                        color: white;
                        cursor: pointer;
                        border-radius: 50%;
                    }
                    div.component{
                        display: flex;
                        width: auto;
                        min-width: 180px;
                        position: absolute;
                        top: 100%;
                        margin-top: 2rem;
                        z-index: 999;
                        // transform: translateX(20%);

                    }
            }
            .hamber{
                display: none;
            }
        }
    }
    
}
@media screen and (max-width: 900px) {
    div.wholeNavbar{
        header.navbar{
            nav{
                .navLinks{
                    display: none;
                }
                .personal{
                    display: none;
                }
                .hamber{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    i{
                        color: white;
                        font-size: 1.5rem;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    
    
}
.active{
    background-color: #C4C5B5;
    border: #B5B8A3 1px solid;
}
</style>
