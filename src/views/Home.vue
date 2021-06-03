<template>
  <div class="home">
    <div class="backend-report">
      <b-card
      header="Python status"
      :header-text-variant="store.state.backendState ? 'success' : 'danger'">
      <b-list-group>
        <b-list-group-item
        :variant="store.state.backendState ? 'success' : 'danger'"
        class="report-entry">
        Backend reports: {{store.state.backendMessage}}
        </b-list-group-item>
        <b-list-group-item v-if='store.state.backendState'
        :variant="store.state.pythonState ? 'success' : 'danger'"
        class="report-entry">
        Python version: {{store.state.pythonVersion}}
        </b-list-group-item>
      </b-list-group>
      </b-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      store: this.$root.$store
    }
  },
  mounted () {
    this.store.dispatch('ajaxGet',
      {
        endpoint: '/'
      })
    this.store.dispatch('ajaxGet',
      {
        endpoint: '/python-version',
        callback: (context, res) => {
          context.commit('updatePythonVersion')
        }
      })
  }
}
</script>

<style lang="scss" scoped>
.backend-report {
  width: 50vw;
  margin-left: 25vw;
  overflow: auto;
}
.report-entry {
  text-align: start;
}
</style>
