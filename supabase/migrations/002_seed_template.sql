-- Seed the default template
INSERT INTO template (name, html, is_active) VALUES (
  'default',
  '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proposal for [PREPARED_FOR_COMPANY] | Opkie</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: ''Inter'', sans-serif; }
    .gradient-bg { background: linear-gradient(135deg, #2d4a6f 0%, #1d3a5f 100%); }
    .card-shadow { box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
    .bonus-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .bonus-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
    .brand-gold { color: #c5a059; }
    .brand-gold-bg { background-color: #c5a059; }
    .brand-navy { color: #2d4a6f; }
    .brand-navy-bg { background-color: #2d4a6f; }
  </style>
</head>
<body class="bg-gray-50 text-gray-900 antialiased">

  <!-- Hero Section -->
  <section class="gradient-bg text-white py-20 px-6">
    <div class="max-w-4xl mx-auto text-center">
      <p class="text-amber-200 uppercase tracking-widest text-sm mb-4">Prepared for [PREPARED_FOR_COMPANY]</p>
      <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-6">[AI_HERO_HEADLINE]</h1>
      <p class="text-xl text-blue-100 max-w-2xl mx-auto">A custom growth strategy for [PREPARED_FOR_FIRST_NAME] and the team in [PREPARED_FOR_CITY].</p>
    </div>
  </section>

  <!-- Video Section -->
  <section class="py-16 px-6 bg-white">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Your Personal Video Walkthrough</h2>
        <p class="text-gray-600">Watch [PREPARED_BY_FIRST_NAME] explain exactly how we can help [PREPARED_FOR_COMPANY] grow.</p>
      </div>
      <div class="relative rounded-2xl overflow-hidden card-shadow" style="padding-top: 56.25%;">
        <iframe
          src="https://www.loom.com/embed/[LOOM_VIDEO_ID]?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
          class="absolute inset-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  </section>

  <!-- Mirror Quote Section -->
  <section class="py-16 px-6 bg-gray-100">
    <div class="max-w-3xl mx-auto text-center">
      <svg class="w-12 h-12 mx-auto mb-6" style="color: #c5a059;" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
      </svg>
      <blockquote class="text-2xl md:text-3xl font-medium text-gray-800 italic leading-relaxed">
        "[AI_MIRROR_QUOTE]"
      </blockquote>
      <p class="mt-6 text-gray-500">— Sound familiar?</p>
    </div>
  </section>

  <!-- City Callout -->
  <section class="py-12 px-6 text-white" style="background-color: #c5a059;">
    <div class="max-w-3xl mx-auto text-center">
      <p class="text-lg md:text-xl font-medium">[AI_CITY_CALLOUT]</p>
    </div>
  </section>

  <!-- What We Do Section -->
  <section class="py-20 px-6 bg-white">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">How Opkie Grows Your Practice</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">We handle your entire marketing operation so you can focus on what you do best — exceptional patient care.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Content Production</h3>
          <p class="text-gray-600">Professional photo, video, and social content that builds trust and authority in your market.</p>
        </div>

        <div class="text-center p-6">
          <div class="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Paid Advertising</h3>
          <p class="text-gray-600">Targeted Google and Meta campaigns that put your practice in front of high-intent patients.</p>
        </div>

        <div class="text-center p-6">
          <div class="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Lead Management</h3>
          <p class="text-gray-600">AI-powered follow-up and appointment booking that converts leads into patients.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Bonuses Section -->
  <section class="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <span class="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">LIMITED TIME OFFER</span>
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Exclusive Bonuses for [PREPARED_FOR_COMPANY]</h2>
        <p class="text-gray-600">Accept by <strong>[BONUS_EXPIRATION_DATE]</strong> to receive these bonuses at no additional cost.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-6" id="bonuses-container">
        <!-- BONUSES_PLACEHOLDER -->
      </div>

      <div class="text-center mt-8">
        <p class="text-gray-500 text-sm">* Bonuses are available for partnerships beginning within 30 days of proposal acceptance.</p>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 px-6 gradient-bg text-white">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Grow [PREPARED_FOR_COMPANY]?</h2>
      <p class="text-xl text-blue-100 mb-8">Let''s schedule a quick call to answer your questions and discuss next steps.</p>
      <a
        href="[PREPARED_BY_CALENDAR_LINK]"
        target="_blank"
        class="inline-block bg-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-amber-50 transition-colors shadow-lg" style="color: #c5a059;"
      >
        Schedule a Call with [PREPARED_BY_FIRST_NAME]
      </a>
    </div>
  </section>

  <!-- Footer / Contact -->
  <footer class="py-12 px-6 bg-gray-900 text-gray-400">
    <div class="max-w-4xl mx-auto">
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 class="text-white text-xl font-semibold mb-2">Questions?</h3>
          <p class="mb-4">Reach out directly — I''m happy to help.</p>
          <div class="space-y-2">
            <p><strong class="text-white">Name:</strong> [PREPARED_BY_NAME]</p>
            <p><strong class="text-white">Email:</strong> <a href="mailto:[PREPARED_BY_EMAIL]" class="text-amber-400 hover:text-amber-300">[PREPARED_BY_EMAIL]</a></p>
            <p><strong class="text-white">Phone:</strong> <a href="tel:[PREPARED_BY_PHONE_RAW]" class="text-amber-400 hover:text-amber-300">[PREPARED_BY_PHONE]</a></p>
          </div>
        </div>
        <div class="text-center md:text-right">
          <p class="text-2xl font-bold text-white mb-1">Opkie</p>
          <p class="text-sm">Dental Marketing, Simplified.</p>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
        <p>&copy; 2026 Opkie. This proposal was prepared exclusively for [PREPARED_FOR_COMPANY].</p>
      </div>
    </div>
  </footer>

</body>
</html>',
  true
);
