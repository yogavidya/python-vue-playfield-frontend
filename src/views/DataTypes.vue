<template>
  <div>
    <b-form-input @change="evalExpression(pythonExpr)"
      v-model="pythonExpr"
      placeholder="Enter a python expression"/>
    <b-btn @click="evalExpression(pythonExpr)">Evaluate</b-btn>
    <b-card v-if="pythonResult">
      <b-row>
        <b-col class="col" cols=2>
          <span class="report-header">result:</span></b-col>
        <b-col class="col" cols=10>
          <span class="report-content">{{pythonResult}}</span></b-col>
      </b-row>

      <b-row>
        <b-col class="col" cols=2>
          <span class="report-header">result type:</span></b-col>
        <b-col class="col" cols=10>
          <span class="report-content">{{pythonType}}</span></b-col>
      </b-row>

      <b-row>
        <b-col class="col" cols=2>
          <span class="report-header">iterable:</span></b-col>
        <b-col class="col" cols=10>
          <span class="report-content">{{pythonIterable}}</span></b-col>
      </b-row>

      <b-row>
        <b-col class="col" cols=2>
          <span class="report-header">hashable:</span></b-col>
        <b-col class="col" cols=10>
          <span class="report-content">{{pythonHashable}}</span></b-col>
      </b-row>

      <b-list-group>
        <b-list-group-item
        v-for="attrGroup in pythonTypeDetails"
        :key="attrGroup.name">
          <span class="report-header">{{attrGroup.name}} attributes:</span>
          <div class="report-content">
          <b-card v-for="attribute in attrGroup.attributes"
          :key="attribute"
          align="left"
          body-class="attribute-card">
            {{attribute}}
          </b-card>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-card>
    <b-card v-if="pythonException">
      <b-row>
        <b-col class="col" cols=4>
          <span class="exception-header">reported python exception</span></b-col>
        <b-col class="col" cols=8>
          <span class="report-content">{{pythonException}}</span></b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import ajax from '../common/ajax'

export default {
  name: 'DataTypes',
  data () {
    return {
      store: this.$root.$store,
      pythonExpr: '',
      pythonResult: undefined,
      pythonType: undefined,
      pythonIterable: false,
      pythonHashable: false,
      pythonException: undefined,
      pythonTypeDetails: undefined,
      lastEvalStatus: false
    }
  },
  methods: {
    evalExpression (expr) {
      ajax.post('/python-eval', {
        expression: this.pythonExpr
      })
        .then((res) => {
          const data = res.data
          const payload = res.data.data
          if (data.status === 'ok') {
            this.lastEvalStatus = true
            if (payload.result) {
              this.pythonResult = payload.result
              this.pythonException = undefined
              this.pythonIterable = payload.iterable
              this.pythonHashable = payload.hashable
              if (payload.type) {
                this.pythonType = payload.type
              } else {
                this.pythonType = undefined
              }
              if (payload.details) {
                this.pythonTypeDetails = payload.details
              } else {
                this.pythonTypeDetails = undefined
              }
            } else if (payload.exception) {
              this.pythonResult = undefined
              this.pythonException = payload.exception
            } else {
              this.pythonResult = 'No usable result from backend.'
            }
          } else {
            this.pythonResult = undefined
            this.pythonException = undefined
            this.lastEvalStatus = false
          }
        })
        .catch((err) => {
          window.alert(`unexpected error: ${err.message}`)
        })
      return null
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/app.scss";

@mixin flow-left {
  display: flex;
  flex-flow: wrap;
}
@mixin header {
  @include flow-left;
  padding: .2rem;
  border: 1px solid black;
  font-weight: bold;
  background-color: $APP-BG-COLOR;
}

.report-content {
  @include flow-left;
}
.attribute-card {
  display: inline-block;
  max-width: auto;
  padding: .1rem;
  margin-left: .3rem;
  margin-right: .3rem;
}

.report-header {
  @include header;
}
.exception-header {
  @include header;
  background-color: pink;
}
</style>
