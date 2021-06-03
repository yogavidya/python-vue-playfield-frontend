import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '../common/ajax'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ajaxResponseData: {},
    ajaxError: false,
    backendState: false,
    backendMessage: '',
    pythonState: false,
    pythonVersion: ''
  },
  mutations: {
    setAjaxResponseData (state, res) {
      state.ajaxError = false
      state.ajaxResponseData = res.data
    },
    setAjaxError (state, err) {
      state.ajaxError = err.message
      state.ajaxResponseData = {}
    },
    updateBackendState (state) {
      if (state.ajaxError === false && state.ajaxResponseData.data) {
        state.backendState = true
        state.backendMessage = state.ajaxResponseData.data.message
      } else {
        state.backendState = false
        state.backendMessage = ''
      }
    },
    updatePythonVersion (state) {
      if (state.ajaxError === true) {
        state.pythonState = false
        state.pythonVersion = ''
      } else {
        state.pythonState = true
        state.pythonVersion = state.ajaxResponseData.data.version
      }
    }
  },
  actions: {
    ajaxGet (context, payload) {
      ajax.get(payload.endpoint)
        .then((res) => {
          context.commit('setAjaxResponseData', res)
          if (payload.callback) {
            const owner = payload.owner ? payload.owner : this
            const callback = payload.callback.bind(owner)
            callback(context, res)
          }
        })
        .catch((err) => context.commit('setAjaxError', err))
        .finally(() => context.commit('updateBackendState'))
    }
  },
  modules: {
  }
})
