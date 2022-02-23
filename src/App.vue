<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-primary">
      <a href="/" class="navbar-brand">Exports Database</a>
    </nav>

    <!-- MAIN CONTENT -->
    <div class="container">
      <div class="row mt-5">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-header">
              <h3>Add Data</h3>
            </div>
            <div class="card-body">
              <form>
                <div class="form-group">
                  <input type="text" id="field1" class="form-control" placeholder="Field1" v-model="datos.field1">
                </div>
                <div class="form-group">
                  <input type="text" id="field2" class="form-control" placeholder="Field2" v-model="datos.field2">
                </div>
                <div class="form-group">
                  <input type="text" id="field3" class="form-control" placeholder="Field3" v-model="datos.field3">
                </div>
                <div class="form-group">
                  <input type="text" id="field4" class="form-control" placeholder="Field4" v-model="datos.field4">
                </div>

                <button type="submit" class="btn btn-primary" @click="saveData">Save</button>
              </form>
            </div>
          </div>
        </div>

        <div class="col-sm-8 text-center">
          <!-- <img src="./assets/logo.png"> -->
          <div class="card">
            <div class="card-header">
              <h3>Data List</h3>
            </div>
            <div class="card-body">
              <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Field1</th>
                  <th>Field2</th>
                  <th>Field3</th>
                  <th>Field4</th>
                </tr>
              </thead>
                <tbody>
                    <tr v-for="d in data" :key="d.field">
                      <td>{{ d.field1 }}</td>
                      <td>{{ d.field2 }}</td>
                      <td>{{ d.field3 }}</td>
                      <td>{{ d.field4 }}</td>
                    </tr>
                    
                </tbody>
              </table>
              <button @click="ExportExcel('xlsx')" class="btn btn-secondary">Export table to Excel</button>
            </div>
          </div>       
        </div>
      </div>
    </div>

    <router-view/>
  </div>
</template>

<script>

import DataService from "./services/DataService";

export default {
  name: 'App',

  data() {
    return {
      data: [],
      datos: {
      field1: '',
      field2: '',
      field3: '',
      field4: ''
      }      
    }    
  },
  methods: {

    ExportExcel(type, fn, dl) {
      let elt = this.$refs.exportable_table;
      let wb = XLSX.utils.table_to_book(elt, {sheet:"Sheet JS"});
      return dl ?
        XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
      XLSX.writeFile(wb, fn || ('SheetJSTableExport.' + (type || 'xlsx')));
    },

    onDataChange(items) {
      let _data = [];

      items.forEach((item) => {
        let data = item.val();
        _data.push({
          field1: data.field1,
          field2: data.field2,
          field3: data.field3,
          field4: data.field4
        });
      });

      this.data = _data;
    },
    saveData() {
      let data = {
        field1: this.datos.field1,
        field2: this.datos.field2,
        field3: this.datos.field3,
        field4: this.datos.field4
      };

      DataService.create(data)
      .then(() => {
          console.log("Created new item successfully!");
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    DataService.getAll().on("value", this.onDataChange);
  },
  beforeUnmount() {
    DataService.getAll().off("value", this.onDataChange);
  }
}

</script>

<style>

</style>
