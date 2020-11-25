const fs = require('fs');

const perCounty = {
  Alba: ['Aiud', 'Blaj', 'Sebeș', 'Alba Iulia', 'Abrud', 'Baia de Arieș', 'Câmpeni',  'Cugir', 'Ocna Mureș', 'Teiuș', 'Zlatna'],
  Arad: ['Arad', 'Chișineu-Criș', 'Ineu', 'Lipova', 'Pâncota', 'Sântana', 'Sebiș','Curtici', 'Pecica', 'Nădlac'],
  'Argeș' : ['Câmpulung', 'Curtea de Argeș', 'Pitești', 'Costești' ,'Mioveni', 'Ștefănești', 'Topoloveni'],
  'Bacău': ['Moinești', 'Onești', 'Bacău', 'Buhuși', 'Comănești', 'Dărmănești','Slănic-Moldova', 'Târgu Ocna'],
  Bihor: ['Beiuș', 'Marghita', 'Salonta' , 'Oradea','Aleșd', 'Vașcău', 'Ștei', 'Săcueni', 'Valea lui Mihai'],
  'Bistrița-Năsăud' :['Bistrița', 'Beclean', 'Năsăud', 'Sângeorz-Băi'],
  'Botoșani': ['Dorohoi', 'Botoșani',  'Bucecea', 'Darabani', 'Flămânzi', 'Săveni', 'Ștefănești'],
  'Brașov': ['Codlea', 'Făgăraș', 'Săcele', 'Brașov', 'Ghimbav', 'Predeal', 'Râșnov', 'Rupea', 'Victoria', 'Zărnești'],
  'Brăila': ['Brăila', 'Făurei', 'Ianca', 'Însurăței'],
  'Buzău': ['Râmnicu Sărat', 'Buzău', 'Nehoiu', 'Pogoanele', 'Pătârlagele' ],
  'Caraș-Severin': ['Caransebeș', 'Reșița', 'Anina', 'Băile Herculane', 'Bocșa', 'Oravița', 'Oțelu Roșu', 'Moldova Nouă'],
  'Călărași': ['Oltenița', 'Călărași', 'Budești', 'Fundulea', 'Lehliu Gară'],
  Cluj: ['Câmpia Turzii', 'Dej', 'Gherla', 'Turda', 'Cluj-Napoca'],
  'Constanța': ['Mangalia', 'Medgidia', 'Constanța', 'Cernavodă', 'Eforie', 'Hârșova', 'Năvodari', 'Ovidiu', 'Techirghiol', 'Negru Vodă' ],
  Covasna: ['Târgu Secuiesc', 'Sfântu Gheorghe', 'Baraolt', 'Covasna', 'Întorsura Buzăului'],
  'Dâmbovița': ['Moreni', 'Târgoviște', 'Fieni', 'Găești', 'Pucioasa', 'Răcari', 'Titu'],
  Dolj: ['Băilești', 'Calafat', 'Craiova', 'Dăbuleni', 'Filiași', 'Segarcea', 'Bechet'],
  'Galați': ['Galați', 'Berești', 'Tecuci', 'Târgu Bujor'],
  'Giurgiu': ['Giurgiu', 'Bolintin-Vale', 'Mihăilești'],
  Gorj: ['Motru', 'Târgu Jiu', 'Bumbești-Jiu', 'Novaci', 'Rovinari', 'Târgu Cărbunești', 'Tismana', 'Turceni' , 'Țicleni'],
  Hargita: ['Gheorgheni', 'Odorheiu Secuiesc', 'Toplița', 'Miercurea Ciuc', 'Băile Tușnad', 'Bălan', 'Borsec', 'Cristuru Secuiesc', 'Vlăhița'],
  Hunedoara: ['Brad', 'Hunedoara', 'Lupeni', 'Orăștie', 'Petroșani', 'Vulcan', 'Deva', 'Aninoasa', 'Călan', 'Geoagiu', 'Hațeg', 'Petrila', 'Simeria', 'Uricani' ],
  'Ialomița': ['Fetești', 'Urziceni', 'Slobozia', 'Amara', 'Căzănești', 'Fierbinți-Târg', 'Țăndărei'],
  'Iași': ['Iași', 'Pașcani', 'Hârlău', 'Podu Iloaiei' , 'Târgu Frumos'],
  Ilfov: ['Bragadiru', 'Buftea', 'Chitila', 'Măgurele', 'Otopeni', 'Pantelimon', 'Popești-Leordeni', 'Voluntari'],
  'Maramureș': ['Sighetu Marmației','Baia Mare', 'Baia Sprie', 'Borșa', 'Cavnic', 'Dragomirești', 'Săliștea de Sus', 'Seini', 'Șomcuta Mare', 'Tăuții-Măgherăuș', 'Târgu Lăpuș', 'Ulmeni', 'Vișeu de Sus'],
  'Mehedinți':  ['Orșova', 'Drobeta-Turnu Severin', 'Baia de Aramă', 'Strehaia', 'Vânju Mare'],
  'Mureș':['Reghin', 'Sighișoara', 'Târnăveni', 'Târgu Mureș', 'Iernut', 'Luduș', 'Miercurea Nirajului', 'Sovata', 'Sângeorgiu de Pădure', 'Sărmașu', 'Ungheni'],
  'Neamț': ['Roman', 'Piatra Neamț', 'Bicaz', 'Roznov', 'Târgu Neamț'],
  Olt: ['Caracal', 'Slatina', 'Balș', 'Corabia', 'Drăgănești-Olt', 'Piatra-Olt', 'Potcoava', 'Scornicești'],
  Prahova: ['Câmpina', 'Ploiești', 'Azuga', 'Băicoi', 'Boldești-Scăeni', 'Breaza', 'Bușteni', 'Comarnic', 'Mizil', 'Plopeni', 'Sinaia', 'Slănic', 'Urlați', 'Vălenii de Munte'],
  'Satu Mare': ['Carei', 'Satu Mare', 'Ardud', 'Livada', 'Negrești-Oaș', 'Tășnad'],
  'Sălaj': ['Zalău','Cehu Silvaniei', 'Jibou', 'Șimleu Silvaniei' ],
  Sibiu: ['Mediaș', 'Sibiu', 'Agnita', 'Avrig', 'Cisnădie', 'Copșa Mică', 'Dumbrăveni', 'Miercurea Sibiului', 'Ocna Sibiului', 'Săliște', 'Tălmaciu'],
  Suceava: ['Câmpulung Moldovenesc', 'Fălticeni', 'Rădăuți', 'Vatra Dornei', 'Suceava','Broșteni', 'Cajvana', 'Dolhasca', 'Frasin', 'Gura Humorului', 'Liteni','Milișăuți', 'Salcea', 'Solca', 'Vicovu de Sus', 'Siret'],
  Teleorman: ['Roșiorii de Vede', 'Turnu Măgurele', 'Alexandria', 'Videle', 'Zimnicea'],
  'Timiș': ['Lugoj', 'Timișoara', 'Buziaș',  'Ciacova', 'Deta', 'Făget', 'Gătaia', 'Recaș', 'Sânnicolau Mare', 'Jimbolia'],
  Tulcea: ['Tulcea', 'Babadag', 'Isaccea', 'Măcin', 'Sulina'],
  Vaslui:  ['Bârlad', 'Huși', 'Vaslui', 'Murgeni', 'Negrești'],
  'Vâlcea': ['Drăgășani', 'Râmnicu Vâlcea', 'Berbești', 'Brezoi', 'Băbeni', 'Băile Govora', 'Băile Olănești', 'Bălcești', 'Călimănești', 'Horezu', 'Ocnele Mari'],
  Vrancea: ['Adjud', 'Focșani', 'Mărășești', 'Odobești', 'Panciu']
}
//str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

let count = 1;
const list = []
Object.keys(perCounty).forEach(county =>{
  perCounty[county].forEach(city=>{
    const name = city;
    const description = city+', judeţul '+county;
    const search = description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const address = null;
    list.push({
      locId: `${count}`,
      name,
      description,
      search,
      address,
      categoryId: 0
    })
    count += 1;
  })
})

list.push({
  locId: `${count}`,
  name: 'București',
  description: 'București, Toate Sectoarele',
  search: 'bucuresti, toate sectoarele, sectorul 1, 2, 3, 4, 5, 6',
  address: 'Toate Sectoarele',
  categoryId: 0
  }
)

fs.writeFile('locations.json', JSON.stringify(list, null, "\t"), err => {
  console.log(err)
})





























