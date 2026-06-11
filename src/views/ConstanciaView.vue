<template>
  <div class="constancia-container">
    <div v-if="loading" class="alert">Cargando constancia oficial de matrícula...</div>
    <div v-else-if="error" class="alert error">{{ error }}</div>

    <div v-else>
      <header class="header-section">
        <h1>CONSTANCIA DE MATRÍCULA DE LABORATORIO</h1>
        <h2>Escuela Profesional de Ingeniería de Sistemas EPIS</h2>
        <p class="fecha-emision">Emitido el: 11/06/2026</p>
      </header>
      <hr class="divider" />

      <section class="info-section">
        <h3>DATOS DEL ALUMNO</h3>
        <div class="info-grid">
          <div class="label">C.U.I.:</div>
          <div class="value table-bold">{{ estudiante.cui }}</div>
          <div class="label">Nombre completo:</div>
          <div class="value">{{ estudiante.full_name }}</div>
          <div class="label">Email:</div>
          <div class="value">{{ estudiante.email || 'No registrado' }}</div>
        </div>
      </section>

      <section class="courses-section">
        <h3>ASIGNATURAS MATRICULADAS</h3>
        <table class="epis-table">
          <thead>
            <tr>
              <th>N°</th><th>Código</th><th>Curso</th><th>Año</th><th>Grupo</th><th>Laboratorio</th><th>Docente</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in constancia" :key="item.id">
              <td class="text-center">{{ index + 1 }}</td>
              <td>{{ item.workload.course.code }}</td>
              <td><span class="table-bold">{{ item.workload.course.name }}</span> ({{ item.workload.course.acronym }})</td>
              <td>{{ item.workload.course.year_display }}</td>
              <td class="text-center">{{ item.workload.group }}</td>
              <td>{{ item.workload.laboratory }}</td>
              <td>{{ item.workload.teacher.full_name }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer class="summary-section">
        <p><span class="table-bold">Total de cursos matriculados:</span> {{ constancia.length }}</p>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['cui'],
  data() {
    return { constancia: [], estudiante: {}, loading: true, error: null }
  },
  mounted() {
    axios.get(`https://sisacad-enrollments-backend.vercel.app/restful/enrollment-certificate/?cui=${this.cui}`)
      .then(response => {
        if (response.data.results && response.data.results.length > 0) {
          this.constancia = response.data.results
          this.estudiante = response.data.results[0].student
        } else { this.error = 'No se encontraron registros.' }
      })
      .catch(() => { this.error = 'Error de comunicación con el Backend.' })
      .finally(() => { this.loading = false })
  }
}
</script>

<style scoped>
.constancia-container { font-family: 'Arial', sans-serif; max-width: 1000px; margin: 30px auto; padding: 0 15px; }
.header-section { text-align: center; }
.header-section h1 { color: #0c4a80; font-size: 24px; }
.header-section h2 { color: #555555; font-size: 18px; }
.divider { border: 0; border-top: 1px solid #999999; margin-bottom: 30px; }
h3 { background-color: #f0f4f8; padding: 8px 12px; border-left: 4px solid #0c4a80; font-size: 14px; }
.info-grid { display: grid; grid-template-columns: 180px 1fr; row-gap: 12px; margin-bottom: 35px; }
.label { font-weight: bold; }
.epis-table { width: 100%; border-collapse: collapse; }
.epis-table th, .epis-table td { border: 1px solid #dbdbdb; padding: 10px 12px; }
.epis-table th { background-color: #f7f7f7; }
.table-bold { font-weight: bold; }
.text-center { text-align: center; }
.alert { padding: 15px; background-color: #e3f2fd; color: #0d47a1; text-align: center; }
</style>