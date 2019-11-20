const Countries = [
  {
    value: 'jepang',
    text: 'Jepang'
  },
  {
    value: 'malaysia',
    text: 'Malaysia'
  },
  {
    value: 'myanmar',
    text: 'Myanmar'
  },
  {
    value: 'nigeria',
    text: 'Nigeria'
  },
  {
    value: 'uea',
    text: 'Uea'
  },
  {
    value: 'korea',
    text: 'Korea'
  },
  {
    value: 'china',
    text: 'China'
  },
  {
    value: 'India',
    text: 'India'
  },
  {
    value: 'belanda',
    text: 'Belanda'
  },
  {
    value:'indonesia',
    text : 'Indonesia'
  }
]

export default Countries.sort((a, b) => {
  const x = a.name.toLowerCase()
  const y = b.name.toLowerCase()
  return x < y ? -1 : x > y ? 1 : 0
})