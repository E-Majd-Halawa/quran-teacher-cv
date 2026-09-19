# موقع السيرة الذاتية الإلكترونية — معلّم قرآن كريم
# Dynamic CV / Portfolio — Quran Teacher

موقع React + Tailwind + Vite جاهز، يدعم اللغتين (عربي RTL / إنجليزي LTR)
والوضع الليلي، مبني حول ملف بيانات مركزي واحد فقط.

A ready-to-run React + Tailwind + Vite site, bilingual (Arabic RTL /
English LTR), with dark mode, built around a single central data file.

## التشغيل محليًا | Run locally

```bash
npm install
npm run dev
```

ثم افتح الرابط الذي يظهر في الطرفية (عادة `http://localhost:5173`).

Then open the URL shown in the terminal (usually `http://localhost:5173`).

## البناء للنشر | Build for deployment

```bash
npm run build
```

الناتج في مجلد `dist/` جاهز للرفع على أي استضافة ساكنة (Vercel, Netlify,
GitHub Pages, cPanel...).

The output in `dist/` is ready to deploy to any static host (Vercel,
Netlify, GitHub Pages, cPanel...).

## تعديل السيرة الذاتية | Editing the CV content

كل محتوى السيرة الذاتية (الاسم، الصورة، النبذة، التخصصات، الشهادات،
الخبرات، الإحصائيات، آراء الطلاب، وسائل التواصل...) موجود في ملف واحد:

All CV content (name, photo, bio, specialties, certificates, experience,
stats, testimonials, contact links...) lives in one file:

```
src/data/teacher.js
```

عدّل القيم مباشرة — كل حقل نصي بصيغة `{ ar: '...', en: '...' }` لدعم
اللغتين. نصوص الواجهة الثابتة (أسماء الأقسام، الأزرار) موجودة في:

Edit the values directly — every text field uses `{ ar: '...', en: '...' }`
for both languages. Fixed UI copy (section names, buttons) lives in:

```
src/data/translations.js
```

## تحميل السيرة كـ PDF | "Download CV PDF" button

الزر في الواجهة الرئيسية (`Hero.jsx`) يحمّل الملف المشار إليه في
`teacher.cvFile` (مبدئيًا `/cv/mohammed-alansari-cv.pdf`). ضع ملف الـ PDF
الفعلي داخل مجلد `public/cv/` بنفس الاسم، أو غيّر المسار في
`src/data/teacher.js`.

The Hero button downloads the file referenced by `teacher.cvFile`
(defaults to `/cv/mohammed-alansari-cv.pdf`). Place the real PDF inside
`public/cv/` with the same name, or change the path in
`src/data/teacher.js`.

## الصور | Images

الصورة الشخصية وصور الشهادات وصور الطلاب هي روابط توضيحية من الإنترنت
(Unsplash / pravatar) — استبدلها بروابط أو ملفات محلية حقيقية عبر
`public/` قبل النشر النهائي.

The profile photo, certificate images, and testimonial avatars are
placeholder links (Unsplash / pravatar) — replace them with real local
files under `public/` before going live.

## بنية المشروع | Project structure

```
src/
  data/teacher.js         ← كل بيانات السيرة الذاتية | all CV data
  data/translations.js    ← نصوص الواجهة | UI copy
  context/AppContext.jsx  ← اللغة + الوضع الليلي | language + theme
  hooks/useReveal.js       ← حركة الظهور عند التمرير | scroll reveal
  components/              ← كل قسم من أقسام الموقع | each site section
```
