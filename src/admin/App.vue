<template lang="pug">
  #app
    .container
        app-header
        app-tabs
        router-view
</template>

<script>
import AppHeader from '@admin/components/common/navigation/AppHeader';
import AppTabs from '@admin/components/common/navigation/AppTabs';
export default {
  components: {
    AppHeader,
    AppTabs
  }
};
</script>
<style lang="sass" src="./styles/common/base.sass"></style>
