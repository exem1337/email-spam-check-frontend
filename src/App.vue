<template>
  <v-app>
    <v-app-bar
      :elevation="2"
      rounded
      color="orange"
    >
      <v-app-bar-title>Электронная почта</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-bottom-navigation v-model="tab">
      <v-btn>
        <v-icon>mdi-email</v-icon>

        <span>Почта</span>
      </v-btn>

      <v-btn>
        <v-icon>mdi-alert</v-icon>

        <span>Спам</span>
      </v-btn>

      <v-btn>
        <v-icon>mdi-thumb-up</v-icon>

        <span>Не спам</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const tab = ref<number>(0);
const router = useRouter();

watch(
  () => tab.value,
  (newValue) => {
    switch (newValue) {
      case 0: {
        router.replace({  path: '/', query: null });
        return;
      }
      case 1: {
        router.replace({ path: '/', query: {
          tab: 'spam'
          }
        });
        return;
      }
      case 2: {
        router.replace({  path: '/', query: {
            tab: 'safe'
          }
        });
        return;
      }
    }
  }
);
</script>

<style lang="scss" scoped>
.v-main {
  max-width: 1010px;
  margin: 0 auto;
  width: 100%;
  padding-top: 120px;
}
</style>
