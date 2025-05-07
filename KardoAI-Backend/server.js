const express = require('express');
const mongoose = require('mongoose');
const Patient = require('./models/Patient');
const cors = require('cors');
require('dotenv').config(); // .env dosyasını okuyabilmek için

const app = express();
const port = 3001; // ya da backend için hangi portu kullanıyorsan

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Middleware (JSON veriyi okuyabilmek için)
app.use(cors())
app.use(express.json());

// Basit bir test route
// D verisini hesaplayan dummy fonksiyon
function estimatedValue(age, sex, basel_creatin, contrast_volume_ml, diabet, hemo, iabp_used, cin_outcome) {
    return (sex + basel_creatin + contrast_volume_ml + diabet + hemo + iabp_used + cin_outcome) / 3 + age * 0.1;
  }
  
  // Yeni hasta kaydetme route'u
  app.post('/api/patients', async (req, res) => {
    try {
      const { age, sex, basel_creatin, contrast_volume_ml, diabet, hemo, iabp_used, cin_outcome } = req.body;
      const cinValue = estimatedValue(age, sex, basel_creatin, contrast_volume_ml, diabet, hemo, iabp_used, cin_outcome);
  
      const newPatient = new Patient({ age, sex, basel_creatin, contrast_volume_ml, diabet, hemo, iabp_used, cin_outcome, cinValue });
  
      await newPatient.save();
  
      res.status(201).json({ message: 'Hasta başarıyla kaydedildi', patient: newPatient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Sunucu hatası' });
    }
  });  

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});
