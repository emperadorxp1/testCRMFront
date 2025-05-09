<template>
  <q-item clickable :to="`/${title}`" tag="router_link">
    <!-- <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section> -->

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ descripcion }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    descripcion: {
      type: String,
      default: "",
    },
    /* 
    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    } */
  },
};
</script>
