<template>
  <base-nav
    v-model="showMenu"
    class="navbar-absolute top-navbar"
    type="white"
    :transparent="true"
  >
    <div slot="brand" class="navbar-wrapper">
      <div
        class="navbar-toggle d-inline"
        :class="{ toggled: $sidebar.showSidebar }"
      >
        <button type="button" class="navbar-toggler" @click="toggleSidebar">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </button>
      </div>
      <!-- {{ routeName }} -->
      <a class="navbar-brand ml-xl-3 ml-5" href="#pablo"></a>
    </div>

    <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
      <div class="search-bar input-group" @click="searchModalVisible = true">
        <button
          class="btn btn-link"
          id="search-button"
          data-toggle="modal"
          data-target="#searchModal"
        >
          <i class="tim-icons icon-zoom-split"></i>
        </button>
        <!-- You can choose types of search input -->
      </div>
      <modal
        :show.sync="searchModalVisible"
        class="modal-search"
        id="searchModal"
        :centered="false"
        :show-close="true"
      >
        <input
          slot="header"
          v-model="searchQuery"
          type="text"
          class="form-control"
          id="inlineFormInputGroup"
          placeholder="SEARCH"
        />
      </modal>
      <base-dropdown
        tag="li"
        :menu-on-right="!$rtl.isRTL"
        title-tag="a"
        title-classes="nav-link"
        class="nav-item"
      >
        <template
          slot="title"
        >
          <div class="notification d-none d-lg-block d-xl-block"></div>
          <i class="tim-icons icon-sound-wave"></i>
          <p class="d-lg-none">New Notifications</p>
        </template>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item"
            >Mike John responded to your email</a
          >
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">You have 5 more tasks</a>
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item"
            >Your friend Michael is in town</a
          >
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Another notification</a>
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Another one</a>
        </li>
      </base-dropdown>
      <base-dropdown
        tag="li"
        :menu-on-right="!$rtl.isRTL"
        title-tag="a"
        class="nav-item"
        title-classes="nav-link"
        menu-classes="dropdown-navbar"
      >
        <template
          slot="title"
        >
        <!-- :src="dataUrl" -->
          <div class="photo" v-if="level == 0"><img src="img/admin.jpg" /></div>
          <div class="photo" v-else><img :src="foto" /></div>
          <b class="caret d-none d-lg-block d-xl-block"></b>
          <p class="d-lg-none">Opciones</p>
        </template>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Editar perfil</a>
        </li>
        <!-- <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Settings</a>
        </li> -->
        <div class="dropdown-divider"></div>
        <li class="nav-link">
          <a href="/login" @click="logout" class="nav-item dropdown-item">Cerrar sesion</a>
        </li>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import {
    mapState
} from "vuex";
import { CollapseTransition } from 'vue2-transitions';
import { BaseNav, Modal } from '@/components';

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal
  },
  computed: {
    routeName() {
      const { path } = this.$route;
      let parts = path.split('/')
      if(parts == ','){
        return 'Dashboard';
      }
      return parts.map(p => this.capitalizeFirstLetter(p)).join(' ');
    },
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: '',
      foto: '',
      level: ''
    };
  },
  computed: {
    dataUrl(){
        return 'data:image/jpeg;base64,' + btoa(
            new Uint8Array(this.foto)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
    }
  },
  methods: {
    capitalizeFirstLetter(string) {
      if (!string || typeof string !== 'string') {
        return ''
      }
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    logout(){
      this.$cookies.remove('auth');
      localStorage.removeItem('level');
      localStorage.removeItem('usuario');
      localStorage.removeItem('email');
      localStorage.removeItem('info');
      localStorage.removeItem('nick')
      localStorage.removeItem('usern')
      localStorage.removeItem('cv')
      localStorage.removeItem('prop');
      localStorage.removeItem('photo');
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  },
  mounted() {
        this.foto = localStorage.getItem('photo');
        console.log(this.foto)
        this.level = localStorage.getItem('level');
    }
};
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
</style>
