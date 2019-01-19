<template lang="pug">
  #app
    .container
        app-header
        app-tabs
        router-view
        notification
</template>

<script>
import AppHeader from '@admin/components/common/navigation/AppHeader';
import AppTabs from '@admin/components/common/navigation/AppTabs';
import Notification from '@admin/components/common/notification/notification';
export default {
  components: {
    AppHeader,
    AppTabs,
    Notification
  }
};
</script>
<style lang="sass" src="./styles/common/base.sass"></style>
