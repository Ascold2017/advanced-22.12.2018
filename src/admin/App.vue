<template lang="pug">
  #app
    .container
        app-tabs
        router-view
</template>

<script>
import AppTabs from '@admin/components/common/navigation/AppTabs';
export default {
  components: {
    AppTabs
  }
};
</script>
<style lang="sass" src="./styles/common/base.sass"></style>
