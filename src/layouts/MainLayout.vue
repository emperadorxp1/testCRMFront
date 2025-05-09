<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> CRM </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8"> CRM </q-item-label>
        <EssentialLink v-for="link in datos" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { ObtenerFuncionesCRM } from "src/services/funcionesServices";

const linksData = [
  {
    title: "CLIENTES",
    caption: "quasar.dev",
    icon: "school",
    link: "https://teejosh.com",
  },
  {
    title: "REPORTES",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "CONFIGURACIÓN",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "L",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default {
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  data() {
    return {
      leftDrawerOpen: false,
      datos: [],
      loading: false,
      essentialLinks: linksData,
    };
  },
  mounted() {
    this.cargarDatos();
  },
  methods: {
    async cargarDatos() {
      try {
        this.datos = await ObtenerFuncionesCRM();
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    },
  },
};
</script>
