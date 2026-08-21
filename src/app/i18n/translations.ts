export interface Translations {
  nav: {
    home: string;
    games: string;
    about: string;
    terms: string;
    contact: string;
  };
  header: {
    themeAria: string;
    soundAria: string;
    langAria: string;
    menuAria: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleAccent: string;
    titleLine2: string;
    lead: string;
    worldwide: string;
    actions: {
      games: string;
      about: string;
      partners: string;
      careers: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    sending: string;
    replyNote: string;
    hoursNote: string;
    validation: {
      nameRequired: string;
      nameLength: string;
      namePattern: string;
      emailRequired: string;
      emailInvalid: string;
      subjectLength: string;
      messageRequired: string;
      messageLength: string;
    };
    status: {
      success: string;
      error: string;
      tooFast: string;
    };
  };
  gamesPage: {
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    titleSuffix: string;
    subtitle: string;
    filters: {
      all: string;
      puzzle: string;
      adventure: string;
      idle: string;
      coop: string;
    };
    featuredBadge: string;
    featured: {
      title: string;
      description: string;
      tags: string[];
      rating: string;
      playNow: string;
      details: string;
    };
    playLabel: string;
    comingSoonBadge: string;
    wishlistLabel: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaPartner: string;
    backHome: string;
    cards: {
      id: string;
      category: 'puzzle' | 'adventure' | 'idle' | 'coop';
      title: string;
      description: string;
      rating?: string;
      note?: string;
      comingSoon?: boolean;
    }[];
  };
  modal: {
    close: string;
    about: {
      title: string;
      paragraphs: string[];
    };
    terms: {
      title: string;
      updated: string;
      sections: { heading: string; body: string }[];
    };
  };
}

export const translations: Record<'en' | 'ru', Translations> = {
  en: {
    nav: {
      home: 'Home',
      games: 'Games',
      about: 'About Studio',
      terms: 'Terms & Conditions',
      contact: 'Contact Us',
    },
    header: {
      themeAria: 'Toggle theme',
      soundAria: 'Toggle background video sound',
      langAria: 'Switch language',
      menuAria: 'Open menu',
    },
    hero: {
      badge: 'PLAY. CREATE. GROW. TOGETHER.',
      titleLine1: 'Play More.',
      titleAccent: 'Create Magic.',
      titleLine2: 'Grow Together.',
      lead: 'AGES Gaming is a casual games studio crafting fun, inclusive, and memorable experiences for players around the world.',
      worldwide: 'Worldwide',
      actions: {
        games: 'Play Our Games',
        about: 'About Studio',
        partners: 'Partner With Us',
        careers: 'Join Our Team',
      },
    },
    contact: {
      title: 'Contact Us',
      subtitle: "We'd love to hear from you.",
      name: 'Your Name',
      email: 'Email Address',
      subject: 'Subject',
      message: 'Message',
      submit: 'Send Message',
      sending: 'Sending…',
      replyNote: 'We reply within 24h',
      hoursNote: 'Mon – Fri, 9AM – 6PM (PT)',
      validation: {
        nameRequired: 'Please enter your name.',
        nameLength: 'Name must be between 2 and 80 characters.',
        namePattern: 'Name can only contain letters, spaces, hyphens and apostrophes.',
        emailRequired: 'Please enter your email address.',
        emailInvalid: 'Please enter a valid email address.',
        subjectLength: 'Subject must be under 150 characters.',
        messageRequired: 'Please enter a message.',
        messageLength: 'Message must be between 10 and 3000 characters.',
      },
      status: {
        success: "Thanks! Your message has been sent — we'll get back to you soon.",
        error: 'Something went wrong. Please try again later or email us directly.',
        tooFast: 'Please take a moment before sending — try again in a couple of seconds.',
      },
    },
    gamesPage: {
      eyebrow: 'OUR GAMES LIBRARY',
      titlePrefix: 'Games We',
      titleAccent: 'Build',
      titleSuffix: '& Love',
      subtitle: 'Casual, cozy, and endlessly replayable. Every title below is crafted in-house by the AGES Gaming studio.',
      filters: {
        all: 'All Games',
        puzzle: 'Puzzle',
        adventure: 'Adventure',
        idle: 'Idle',
        coop: 'Co-op',
      },
      featuredBadge: 'FEATURED RELEASE',
      featured: {
        title: 'Dragon Isles: Cozy Skies',
        description:
          'Build your floating island, hatch dragon companions, and trade with sky villages. A relaxing builder with a new event season every month.',
        tags: ['Builder', 'Cozy', 'Single player'],
        rating: '4.8',
        playNow: 'Play Now',
        details: 'Game Details',
      },
      playLabel: 'Play',
      comingSoonBadge: 'COMING SOON',
      wishlistLabel: 'Wishlist',
      ctaTitle: 'Want your game on this shelf?',
      ctaSubtitle: 'We co-develop and publish casual titles with indie teams worldwide.',
      ctaPartner: 'Partner With Us',
      backHome: 'Back Home',
      cards: [
        {
          id: 'bubble-bloom',
          category: 'puzzle',
          title: 'Bubble Bloom',
          description: 'Match blossoms, grow your garden, and unlock 500+ hand-made levels.',
          note: 'Spring 2026',
          comingSoon: true,
        },
        {
          id: 'sky-trail-runners',
          category: 'adventure',
          title: 'Sky Trail Runners',
          description: 'Dash across floating islands, dodge storms, and rescue lost dragon eggs.',
          note: 'Summer 2026',
          comingSoon: true,
        },
        {
          id: 'tiny-tavern-tycoon',
          category: 'idle',
          title: 'Tiny Tavern Tycoon',
          description: 'Serve adventurers, upgrade your kitchen, and let profits brew offline.',
          note: 'Fall 2026',
          comingSoon: true,
        },
        {
          id: 'cloud-kitchen-crew',
          category: 'coop',
          title: 'Cloud Kitchen Crew',
          description: 'Four-player cooking chaos above the clouds. Cross-play on every device.',
          note: 'Winter 2026',
          comingSoon: true,
        },
        {
          id: 'rune-and-ribbon',
          category: 'puzzle',
          title: 'Rune & Ribbon',
          description: 'Draw runes to solve gentle logic puzzles with a lo-fi soundtrack.',
          note: 'Spring 2026',
          comingSoon: true,
        },
        {
          id: 'dragon-isles-2',
          category: 'adventure',
          title: 'Dragon Isles 2',
          description: 'Bigger skies, co-op islands, and dragon breeding. Wishlist it today.',
          note: 'Winter 2026',
          comingSoon: true,
        },
      ],
    },
    modal: {
      close: 'Close',
      about: {
        title: 'About Studio',
        paragraphs: [
          'AGES Gaming is a casual games studio on a mission to craft fun, inclusive, and memorable experiences for players everywhere.',
          'Founded by a small team of lifelong gamers and creators, we believe great games should be easy to pick up, hard to put down, and welcoming to everyone — regardless of skill level or background.',
          "From concept to launch, we obsess over polish, accessibility, and player feedback. Every title we ship is built to bring people together, one playful moment at a time.",
          "We're always looking for talented people and studios who share our passion. If that sounds like you, we'd love to hear from you.",
        ],
      },
      terms: {
        title: 'Terms & Conditions',
        updated: 'Last updated: August 2026',
        sections: [
          {
            heading: '1. Acceptance of Terms',
            body: 'By accessing or using the AGES Gaming website and games, you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of our services.',
          },
          {
            heading: '2. Use of Our Games & Services',
            body: 'Our games and website are provided for personal, non-commercial entertainment. You agree not to misuse, reverse-engineer, or exploit any part of our services in ways not intended by AGES Gaming.',
          },
          {
            heading: '3. Intellectual Property',
            body: 'All game assets, logos, characters, and content on this site are the property of AGES Gaming or its licensors and are protected by copyright and trademark law.',
          },
          {
            heading: '4. User Conduct',
            body: 'When interacting with our community features, you agree to behave respectfully and refrain from harassment, hate speech, or any unlawful activity.',
          },
          {
            heading: '5. Privacy',
            body: 'We collect only the information necessary to operate and improve our games and services. We never sell your personal data to third parties.',
          },
          {
            heading: '6. Changes to These Terms',
            body: 'We may update these Terms & Conditions from time to time. Continued use of our services after changes constitutes acceptance of the revised terms.',
          },
          {
            heading: '7. Contact Us',
            body: "Questions about these terms? Reach out at hello@agesgaming.com — we're happy to help.",
          },
        ],
      },
    },
  },
  ru: {
    nav: {
      home: 'Главная',
      games: 'Игры',
      about: 'О студии',
      terms: 'Условия использования',
      contact: 'Связаться с нами',
    },
    header: {
      themeAria: 'Переключить тему',
      soundAria: 'Включить или выключить звук фонового видео',
      langAria: 'Сменить язык',
      menuAria: 'Открыть меню',
    },
    hero: {
      badge: 'ИГРАЙ. ТВОРИ. РАСТИ. ВМЕСТЕ.',
      titleLine1: 'Играй больше.',
      titleAccent: 'Твори магию.',
      titleLine2: 'Расти вместе.',
      lead: 'AGES Gaming — казуальная игровая студия, создающая увлекательный, доступный и запоминающийся игровой опыт для игроков по всему миру.',
      worldwide: 'По всему миру',
      actions: {
        games: 'Наши игры',
        about: 'О студии',
        partners: 'Стать партнёром',
        careers: 'Присоединиться к нам',
      },
    },
    contact: {
      title: 'Связаться с нами',
      subtitle: 'Будем рады вашему сообщению.',
      name: 'Ваше имя',
      email: 'Электронная почта',
      subject: 'Тема',
      message: 'Сообщение',
      submit: 'Отправить сообщение',
      sending: 'Отправка…',
      replyNote: 'Отвечаем в течение 24 часов',
      hoursNote: 'Пн–Пт, 9:00–18:00 (PT)',
      validation: {
        nameRequired: 'Пожалуйста, введите ваше имя.',
        nameLength: 'Имя должно содержать от 2 до 80 символов.',
        namePattern: 'Имя может содержать только буквы, пробелы, дефис и апостроф.',
        emailRequired: 'Пожалуйста, введите адрес электронной почты.',
        emailInvalid: 'Пожалуйста, введите корректный адрес электронной почты.',
        subjectLength: 'Тема должна быть короче 150 символов.',
        messageRequired: 'Пожалуйста, введите сообщение.',
        messageLength: 'Сообщение должно содержать от 10 до 3000 символов.',
      },
      status: {
        success: 'Спасибо! Ваше сообщение отправлено — мы скоро вам ответим.',
        error: 'Что-то пошло не так. Попробуйте позже или напишите нам напрямую.',
        tooFast: 'Пожалуйста, не торопитесь — повторите отправку через пару секунд.',
      },
    },
    gamesPage: {
      eyebrow: 'НАША БИБЛИОТЕКА ИГР',
      titlePrefix: 'Игры, которые мы',
      titleAccent: 'создаём',
      titleSuffix: 'и любим',
      subtitle: 'Казуальные, уютные и по-настоящему увлекательные. Каждая игра ниже создана студией AGES Gaming.',
      filters: {
        all: 'Все игры',
        puzzle: 'Головоломки',
        adventure: 'Приключения',
        idle: 'Idle',
        coop: 'Кооператив',
      },
      featuredBadge: 'НОВИНКА',
      featured: {
        title: 'Dragon Isles: Cozy Skies',
        description:
          'Стройте свой парящий остров, выращивайте драконов-компаньонов и торгуйте с небесными деревнями. Уютный симулятор строительства с новым сезоном каждый месяц.',
        tags: ['Строительство', 'Уют', 'Одиночная игра'],
        rating: '4.8',
        playNow: 'Играть',
        details: 'О игре',
      },
      playLabel: 'Играть',
      comingSoonBadge: 'СКОРО',
      wishlistLabel: 'В избранное',
      ctaTitle: 'Хотите, чтобы ваша игра была здесь?',
      ctaSubtitle: 'Мы совместно разрабатываем и издаём казуальные игры с инди-командами по всему миру.',
      ctaPartner: 'Стать партнёром',
      backHome: 'На главную',
      cards: [
        {
          id: 'bubble-bloom',
          category: 'puzzle',
          title: 'Bubble Bloom',
          description: 'Собирайте цветы, выращивайте сад и открывайте более 500 уровней ручной работы.',
          note: 'Весна 2026',
          comingSoon: true,
        },
        {
          id: 'sky-trail-runners',
          category: 'adventure',
          title: 'Sky Trail Runners',
          description: 'Бегите по парящим островам, уклоняйтесь от бурь и спасайте яйца драконов.',
          note: 'Лето 2026',
          comingSoon: true,
        },
        {
          id: 'tiny-tavern-tycoon',
          category: 'idle',
          title: 'Tiny Tavern Tycoon',
          description: 'Обслуживайте искателей приключений, улучшайте кухню и получайте доход офлайн.',
          note: 'Осень 2026',
          comingSoon: true,
        },
        {
          id: 'cloud-kitchen-crew',
          category: 'coop',
          title: 'Cloud Kitchen Crew',
          description: 'Кулинарный хаос на четверых высоко над облаками. Кросс-плей на любых устройствах.',
          note: 'Зима 2026',
          comingSoon: true,
        },
        {
          id: 'rune-and-ribbon',
          category: 'puzzle',
          title: 'Rune & Ribbon',
          description: 'Рисуйте руны, решайте уютные логические головоломки под lo-fi музыку.',
          note: 'Весна 2026',
          comingSoon: true,
        },
        {
          id: 'dragon-isles-2',
          category: 'adventure',
          title: 'Dragon Isles 2',
          description: 'Больше неба, совместные острова и разведение драконов. Добавьте в избранное уже сейчас.',
          note: 'Зима 2026',
          comingSoon: true,
        },
      ],
    },
    modal: {
      close: 'Закрыть',
      about: {
        title: 'О студии',
        paragraphs: [
          'AGES Gaming — казуальная игровая студия, создающая увлекательные, доступные и запоминающиеся впечатления для игроков по всему миру.',
          'Основанная небольшой командой преданных игроков и разработчиков, мы верим, что хорошие игры должны легко осваиваться, затягивать надолго и быть открытыми для всех — независимо от уровня навыков.',
          'От идеи до релиза мы уделяем особое внимание качеству, доступности и обратной связи от игроков. Каждая наша игра создаётся, чтобы объединять людей в моменты радости.',
          'Мы всегда открыты для талантливых людей и студий, разделяющих нашу страсть к играм. Если это про вас — будем рады знакомству.',
        ],
      },
      terms: {
        title: 'Условия использования',
        updated: 'Обновлено: август 2026',
        sections: [
          {
            heading: '1. Принятие условий',
            body: 'Используя сайт и игры AGES Gaming, вы соглашаетесь соблюдать настоящие Условия использования. Если вы не согласны — пожалуйста, прекратите использование наших сервисов.',
          },
          {
            heading: '2. Использование игр и сервисов',
            body: 'Наши игры и сайт предназначены для личного некоммерческого использования в развлекательных целях. Вы обязуетесь не злоупотреблять, не производить обратную разработку и не эксплуатировать сервисы способами, не предусмотренными AGES Gaming.',
          },
          {
            heading: '3. Интеллектуальная собственность',
            body: 'Все игровые ресурсы, логотипы, персонажи и контент на этом сайте являются собственностью AGES Gaming или её лицензиаров и защищены законами об авторском праве и товарных знаках.',
          },
          {
            heading: '4. Поведение пользователей',
            body: 'Взаимодействуя с сообществом, вы соглашаетесь вести себя уважительно и воздерживаться от преследования, языка вражды и любой противоправной деятельности.',
          },
          {
            heading: '5. Конфиденциальность',
            body: 'Мы собираем только те данные, которые необходимы для работы и улучшения наших игр и сервисов. Мы никогда не продаём ваши персональные данные третьим лицам.',
          },
          {
            heading: '6. Изменения условий',
            body: 'Мы можем время от времени обновлять данные Условия использования. Продолжение использования сервисов после изменений означает согласие с обновлёнными условиями.',
          },
          {
            heading: '7. Свяжитесь с нами',
            body: 'Есть вопросы по условиям? Напишите нам на hello@agesgaming.com — мы всегда рады помочь.',
          },
        ],
      },
    },
  },
};
