import _ from 'lodash'

const Departements = [
  {
    id: 1,
    name: 'WH RMPM'
  },
  {
    id: 2,
    name: 'WH FG'
  },
  {
    id: 3,
    name: 'PPC & PREPARASI PLANT'
  },
  {
    id: 4,
    name: 'PRODUKSI'
  },
  {
    id: 5,
    name: 'MAINTENANCE'
  },
  {
    id: 6,
    name: 'PPIC'
  },
  {
    id: 7,
    name: 'PROCUREMENT'
  },
  {
    id: 8,
    name: 'TPP'
  },
  {
    id: 9,
    name: 'PMD'
  },
  {
    id: 10,
    name: 'IT'
  },
  {
    id: 11,
    name: 'COSTING'
  },
  {
    id: 12,
    name: 'MS'
  },
  {
    id: 13,
    name: 'QA PLANT'
  },
  {
    id: 14,
    name: 'HCD KN'
  },
  {
    id: 15,
    name: 'GA KN'
  },
  {
    id: 16,
    name: 'QFS'
  },
  {
    id: 17,
    name: 'QA ANALITICAL CENTER'
  },
  {
    id: 18,
    name: 'QA SCM'
  },
  {
    id: 19,
    name: 'TAMU'
  },
  {
    id: 20,
    name: 'MANAJEMEN'
  },
  {
    id: 21,
    name: 'HR GA PLANT'
  },
  {
    id: 22,
    name: 'CMD'
  },
  {
    id: 23,
    name: 'Fasilitator'
  }
]

export default _.orderBy(Departements, ['name'], ['asc'])