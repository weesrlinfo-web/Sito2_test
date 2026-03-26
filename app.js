/* =========================================================
   PLUGHUB - Map + List (no search)
   - Lista stazioni a sinistra, mappa a destra
   - Card overlay in stile "app"
   - Cookie gate: se rifiuti, la mappa resta off ma la lista funziona
   - Multi-language support: IT, EN, ES, ZH, JA
   ========================================================= */

   'use strict';

   /** =========================
    *  TRANSLATIONS
    *  ========================= */
   const TRANSLATIONS = {
     it: {
       meta: {
         title: "PLUGHUB | Power Bank Sharing Italia",
         description: "PLUGHUB - Power bank sharing in Italia. Trova una stazione vicino a te e ottieni indicazioni in un tap."
       },
       cookie: {
         title: "Informativa breve:",
         message: "questo sito usa cookie tecnici e servizi di terze parti (Google Maps) per mostrarti la mappa. Accettando, consenti l'uso di Google Maps. Rifiutando, vedrai comunque la lista delle stazioni, ma la mappa resterà disattivata.",
         accept: "Accetta",
         reject: "Rifiuta",
         policy: "Cookie Policy"
       },
       nav: {
         map: "Mappa",
         prices: "Prezzi",
         venues: "Per i Locali",
         faq: "FAQ",
         contact: "Contatti",
         partner: "Diventa Partner"
       },
       hero: {
         badge: "Power bank sharing",
         title: "Non restare mai senza <span class='text-brand-blue'>batteria</span>.",
         subtitle: "Trova una stazione vicino a te, ritira un powerbank e continua la giornata. Restituiscilo in qualsiasi stazione.",
         cta: {
           find: "Trova una stazione",
           partner: "Diventa partner"
         },
         stats: {
           price: "ogni 30 min",
           staff: "gestione staff",
           stations: "stazioni"
         },
         card: {
           title: "Mappa + Lista",
           subtitle: "Seleziona un bar e apri le indicazioni.",
           description: "Ora puoi vedere tutte le stazioni nella mappa e, a sinistra, la lista completa dei locali. Tocca un locale per vedere i dettagli e ottenere le indicazioni su Google Maps."
         }
       },
       map: {
         title: "Stazioni PLUGHUB",
         subtitle: "Lista a sinistra, mappa a destra. Clicca un locale per vedere i dettagli e aprire le indicazioni.",
         showAll: "Mostra tutte",
         list: {
           title: "Locali",
           total: "totali",
           hint: "Suggerimento: consenti la posizione per vedere le distanze."
         },
         overlay: {
           title: "Mappa disattivata",
           message: "Per visualizzare la mappa interattiva, accetta i cookie di terze parti (Google Maps). La lista dei locali resta sempre disponibile.",
           cta: "Accetta e visualizza la mappa",
           policy: "Leggi la Cookie Policy"
         },
         card: {
           payment: "Pagamento:",
           available: "powerbank disponibili",
           directions: "Indicazioni"
         }
       },
       prices: {
         title: "Tariffe trasparenti",
         subtitle: "Paga solo per il tempo che utilizzi. Niente abbonamenti, niente sorprese.",
         badge: "PAGA E USA",
         rate: {
           title: "Tariffa",
           item1: "<strong class='text-white'>1€</strong> ogni 30 minuti",
           item2: "Pagamento al momento del prelievo",
           item3: "Restituisci in qualunque stazione"
         },
         card: {
           label: "Tariffa",
           period: "Ogni 30 minuti",
           simple: "Semplice e trasparente"
         },
         secure: "Pagamento sicuro tramite POS contactless"
       },
       partnership: {
         badge: "Partnership",
         title: "Ospita PLUGHUB nel tuo locale",
         subtitle: "Installazione a costo zero. Commissione su ogni noleggio. Zero gestione per lo staff.",
         feature1: {
           title: "Attrai clienti",
           desc: "Un servizio utile che aumenta il valore percepito."
         },
         feature2: {
           title: "Guadagno condiviso",
           desc: "Entrate su ogni noleggio senza investimenti."
         },
         cta: {
           contact: "Contattaci",
           map: "Vedi la mappa"
         },
         requirements: {
           title: "Cosa serve?",
           item1: "Un punto vicino alla cassa (visibile)",
           item2: "Una presa di corrente",
           item3: "Stop: lo staff non gestisce nulla",
           note: "Scrivici e ti mandiamo una proposta in 2 minuti."
         }
       },
       faq: {
         title: "FAQ",
         subtitle: "Risposte rapide alle domande più comuni.",
         q1: {
           question: "Come funziona?",
           answer: "Ritiri un powerbank in una stazione e lo restituisci in qualunque altra. Paghi in base al tempo."
         },
         q2: {
           question: "Devo installare un'app?",
           answer: "Dipende dal flusso di pagamento scelto. In generale puoi pagare con carta / app."
         },
         q3: {
           question: "La mappa non si vede: perché?",
           answer: "La mappa usa Google Maps e richiede il consenso ai cookie di terze parti. La lista rimane sempre visibile."
         },
         q4: {
           question: "Cosa succede se non riconsegno il powerbank?",
           answer: "Se non riconsegui il powerbank entro 24 ore dal prelievo, ti verrà addebitata automaticamente sulla carta utilizzata una penale di 30€. In questo caso il dispositivo diventa di tua proprietà."
         }
       },
       contact: {
         title: "Contatti",
         subtitle: "Scrivici e ti rispondiamo velocemente.",
         email: {
           label: "Email",
           cta: "Invia email"
         }
       },
       footer: {
         tagline: "Il servizio di power bank sharing. Ricarica ovunque, in qualsiasi momento.",
         links: {
           title: "Link"
         },
         legal: {
           title: "Legale",
           privacy: "Privacy Policy",
           cookies: "Cookie Policy"
         },
         contact: {
           title: "Contatti"
         },
         company: "PLUGHUB è un brand di Wee S.R.L.S.",
         copyright: "Tutti i diritti riservati © 2026"
       }
     },
     en: {
       meta: {
         title: "PLUGHUB | Power Bank Sharing Italy",
         description: "PLUGHUB - Power bank sharing in Italy. Find a station near you and get directions in one tap."
       },
       cookie: {
         title: "Brief notice:",
         message: "This site uses technical cookies and third-party services (Google Maps) to show you the map. By accepting, you consent to the use of Google Maps. If you decline, you will still see the station list, but the map will remain disabled.",
         accept: "Accept",
         reject: "Decline",
         policy: "Cookie Policy"
       },
       nav: {
         map: "Map",
         prices: "Prices",
         venues: "For Venues",
         faq: "FAQ",
         contact: "Contact",
         partner: "Become a Partner"
       },
       hero: {
         badge: "Power bank sharing",
         title: "Never run out of <span class='text-brand-blue'>battery</span>.",
         subtitle: "Find a station near you, pick up a power bank, and continue your day. Return it at any station.",
         cta: {
           find: "Find a Station",
           partner: "Become a Partner"
         },
         stats: {
           price: "per 30 min",
           staff: "staff management",
           stations: "stations"
         },
         card: {
           title: "Map + List",
           subtitle: "Select a venue and open directions.",
           description: "Now you can see all stations on the map and, on the left, the complete list of venues. Tap a venue to see details and get directions on Google Maps."
         }
       },
       map: {
         title: "PLUGHUB Stations",
         subtitle: "List on the left, map on the right. Click a venue to see details and open directions.",
         showAll: "Show All",
         list: {
           title: "Venues",
           total: "total",
           hint: "Tip: allow location to see distances."
         },
         overlay: {
           title: "Map Disabled",
           message: "To view the interactive map, please accept third-party cookies (Google Maps). The venue list remains always available.",
           cta: "Accept and View Map",
           policy: "Read Cookie Policy"
         },
         card: {
           payment: "Payment:",
           available: "power banks available",
           directions: "Directions"
         }
       },
       prices: {
         title: "Transparent Pricing",
         subtitle: "Pay only for the time you use. No subscriptions, no surprises.",
         badge: "PAY & USE",
         rate: {
           title: "Rate",
           item1: "<strong class='text-white'>€1</strong> every 30 minutes",
           item2: "Payment at pickup",
           item3: "Return at any station"
         },
         card: {
           label: "Rate",
           period: "Every 30 minutes",
           simple: "Simple and transparent"
         },
         secure: "Secure payment via contactless POS"
       },
       partnership: {
         badge: "Partnership",
         title: "Host PLUGHUB at Your Venue",
         subtitle: "Zero installation cost. Commission on every rental. Zero staff management.",
         feature1: {
           title: "Attract Customers",
           desc: "A useful service that increases perceived value."
         },
         feature2: {
           title: "Shared Revenue",
           desc: "Earnings on every rental with no investment."
         },
         cta: {
           contact: "Contact Us",
           map: "View the Map"
         },
         requirements: {
           title: "What do you need?",
           item1: "A spot near the counter (visible)",
           item2: "A power outlet",
           item3: "Stop: staff manages nothing",
           note: "Write to us and we'll send you a proposal in 2 minutes."
         }
       },
       faq: {
         title: "FAQ",
         subtitle: "Quick answers to common questions.",
         q1: {
           question: "How does it work?",
           answer: "Pick up a power bank at one station and return it at any other. You pay based on time."
         },
         q2: {
           question: "Do I need to install an app?",
           answer: "It depends on the payment flow chosen. Generally, you can pay with card / app."
         },
         q3: {
           question: "Why can't I see the map?",
           answer: "The map uses Google Maps and requires consent for third-party cookies. The list remains always visible."
         },
         q4: {
           question: "What happens if I don't return the power bank?",
           answer: "If you don't return the power bank within 24 hours of pickup, a penalty of €30 will be automatically charged to the card used. In this case, the device becomes your property."
         }
       },
       contact: {
         title: "Contact",
         subtitle: "Write to us and we'll respond quickly.",
         email: {
           label: "Email",
           cta: "Send Email"
         }
       },
       footer: {
         tagline: "The power bank sharing service. Charge anywhere, anytime.",
         links: {
           title: "Links"
         },
         legal: {
           title: "Legal",
           privacy: "Privacy Policy",
           cookies: "Cookie Policy"
         },
         contact: {
           title: "Contact"
         },
         company: "PLUGHUB is a brand of Wee S.R.L.S.",
         copyright: "All rights reserved © 2026"
       }
     },
     es: {
       meta: {
         title: "PLUGHUB | Compartir Power Bank Italia",
         description: "PLUGHUB - Compartir power bank en Italia. Encuentra una estación cerca de ti y obtén indicaciones con un toque."
       },
       cookie: {
         title: "Aviso breve:",
         message: "Este sitio utiliza cookies técnicas y servicios de terceros (Google Maps) para mostrarte el mapa. Al aceptar, consientes el uso de Google Maps. Si rechazas, seguirás viendo la lista de estaciones, pero el mapa permanecerá desactivado.",
         accept: "Aceptar",
         reject: "Rechazar",
         policy: "Política de Cookies"
       },
       nav: {
         map: "Mapa",
         prices: "Precios",
         venues: "Para Locales",
         faq: "FAQ",
         contact: "Contacto",
         partner: "Hazte Partner"
       },
       hero: {
         badge: "Compartir power bank",
         title: "Nunca te quedes sin <span class='text-brand-blue'>batería</span>.",
         subtitle: "Encuentra una estación cerca de ti, recoge un power bank y continúa tu día. Devuélvelo en cualquier estación.",
         cta: {
           find: "Encuentra una Estación",
           partner: "Hazte Partner"
         },
         stats: {
           price: "cada 30 min",
           staff: "gestión personal",
           stations: "estaciones"
         },
         card: {
           title: "Mapa + Lista",
           subtitle: "Selecciona un local y abre las indicaciones.",
           description: "Ahora puedes ver todas las estaciones en el mapa y, a la izquierda, la lista completa de locales. Toca un local para ver los detalles y obtener las indicaciones en Google Maps."
         }
       },
       map: {
         title: "Estaciones PLUGHUB",
         subtitle: "Lista a la izquierda, mapa a la derecha. Haz clic en un local para ver los detalles y abrir las indicaciones.",
         showAll: "Mostrar Todas",
         list: {
           title: "Locales",
           total: "totales",
           hint: "Sugerencia: permite la ubicación para ver las distancias."
         },
         overlay: {
           title: "Mapa Desactivado",
           message: "Para ver el mapa interactivo, acepta las cookies de terceros (Google Maps). La lista de locales siempre está disponible.",
           cta: "Aceptar y Ver Mapa",
           policy: "Leer Política de Cookies"
         },
         card: {
           payment: "Pago:",
           available: "power banks disponibles",
           directions: "Indicaciones"
         }
       },
       prices: {
         title: "Tarifas Transparentes",
         subtitle: "Paga solo por el tiempo que uses. Sin suscripciones, sin sorpresas.",
         badge: "PAGA Y USA",
         rate: {
           title: "Tarifa",
           item1: "<strong class='text-white'>1€</strong> cada 30 minutos",
           item2: "Pago al momento de la recogida",
           item3: "Devuelve en cualquier estación"
         },
         card: {
           label: "Tarifa",
           period: "Cada 30 minutos",
           simple: "Simple y transparente"
         },
         secure: "Pago seguro mediante POS contactless"
       },
       partnership: {
         badge: "Partnership",
         title: "Aloja PLUGHUB en tu Local",
         subtitle: "Instalación sin coste. Comisión por cada alquiler. Cero gestión para el personal.",
         feature1: {
           title: "Atrae Clientes",
           desc: "Un servicio útil que aumenta el valor percibido."
         },
         feature2: {
           title: "Ingresos Compartidos",
           desc: "Ganancias en cada alquiler sin inversión."
         },
         cta: {
           contact: "Contáctanos",
           map: "Ver el Mapa"
         },
         requirements: {
           title: "¿Qué necesitas?",
           item1: "Un punto cerca de la caja (visible)",
           item2: "Un enchufe",
           item3: "Stop: el personal no gestiona nada",
           note: "Escríbenos y te enviamos una propuesta en 2 minutos."
         }
       },
       faq: {
         title: "FAQ",
         subtitle: "Respuestas rápidas a las preguntas más comunes.",
         q1: {
           question: "¿Cómo funciona?",
           answer: "Recoge un power bank en una estación y devuélvelo en cualquier otra. Pagas según el tiempo."
         },
         q2: {
           question: "¿Necesito instalar una app?",
           answer: "Depende del flujo de pago elegido. En general puedes pagar con tarjeta / app."
         },
         q3: {
           question: "¿Por qué no veo el mapa?",
           answer: "El mapa usa Google Maps y requiere el consentimiento para cookies de terceros. La lista siempre es visible."
         },
         q4: {
           question: "¿Qué pasa si no devuelvo el power bank?",
           answer: "Si no devuelves el power bank dentro de las 24 horas desde la recogida, se te cargará automáticamente en la tarjeta utilizada una penalización de 30€. En este caso, el dispositivo pasa a ser de tu propiedad."
         }
       },
       contact: {
         title: "Contacto",
         subtitle: "Escríbenos y te respondemos rápidamente.",
         email: {
           label: "Email",
           cta: "Enviar Email"
         }
       },
       footer: {
         tagline: "El servicio de compartir power bank. Carga en cualquier lugar, en cualquier momento.",
         links: {
           title: "Enlaces"
         },
         legal: {
           title: "Legal",
           privacy: "Política de Privacidad",
           cookies: "Política de Cookies"
         },
         contact: {
           title: "Contacto"
         },
         company: "PLUGHUB es una marca de Wee S.R.L.S.",
         copyright: "Todos los derechos reservados © 2026"
       }
     },
     zh: {
       meta: {
         title: "PLUGHUB | 意大利共享充电宝",
         description: "PLUGHUB - 意大利共享充电宝服务。找到您附近的站点，一键获取导航。"
       },
       cookie: {
         title: "简要说明：",
         message: "本网站使用技术Cookie和第三方服务（Google地图）来显示地图。接受即表示您同意使用Google地图。如果拒绝，您仍然可以看到站点列表，但地图将保持禁用状态。",
         accept: "接受",
         reject: "拒绝",
         policy: "Cookie政策"
       },
       nav: {
         map: "地图",
         prices: "价格",
         venues: "商家合作",
         faq: "常见问题",
         contact: "联系我们",
         partner: "成为合作伙伴"
       },
       hero: {
         badge: "共享充电宝",
         title: "永不断<span class='text-brand-blue'>电</span>。",
         subtitle: "找到您附近的站点，借取充电宝，继续您的一天。可在任意站点归还。",
         cta: {
           find: "查找站点",
           partner: "成为合作伙伴"
         },
         stats: {
           price: "每30分钟",
           staff: "员工管理",
           stations: "站点"
         },
         card: {
           title: "地图 + 列表",
           subtitle: "选择商家并打开导航。",
           description: "现在您可以在地图上查看所有站点，左侧是完整的商家列表。点击商家查看详情并获取Google地图导航。"
         }
       },
       map: {
         title: "PLUGHUB站点",
         subtitle: "左侧列表，右侧地图。点击商家查看详情并打开导航。",
         showAll: "显示全部",
         list: {
           title: "商家",
           total: "总计",
           hint: "提示：允许定位以查看距离。"
         },
         overlay: {
           title: "地图已禁用",
           message: "要查看交互式地图，请接受第三方Cookie（Google地图）。商家列表始终可用。",
           cta: "接受并查看地图",
           policy: "阅读Cookie政策"
         },
         card: {
           payment: "支付方式：",
           available: "个充电宝可用",
           directions: "导航"
         }
       },
       prices: {
         title: "透明定价",
         subtitle: "按实际使用时间付费。无订阅，无隐藏费用。",
         badge: "即付即用",
         rate: {
           title: "费率",
           item1: "每30分钟<strong class='text-white'>1欧元</strong>",
           item2: "借取时付款",
           item3: "可在任意站点归还"
         },
         card: {
           label: "费率",
           period: "每30分钟",
           simple: "简单透明"
         },
         secure: "通过非接触式POS安全支付"
       },
       partnership: {
         badge: "合作伙伴",
         title: "在您的店铺 hosting PLUGHUB",
         subtitle: "零安装成本。每次租赁分成。零员工管理。",
         feature1: {
           title: "吸引顾客",
           desc: "一项提升感知价值的实用服务。"
         },
         feature2: {
           title: "共享收益",
           desc: "每次租赁都有收益，无需投资。"
         },
         cta: {
           contact: "联系我们",
           map: "查看地图"
         },
         requirements: {
           title: "需要什么？",
           item1: "收银台附近的显眼位置",
           item2: "一个电源插座",
           item3: "停止：员工无需管理任何事务",
           note: "给我们写信，我们将在2分钟内发送提案。"
         }
       },
       faq: {
         title: "常见问题",
         subtitle: "常见问题的快速解答。",
         q1: {
           question: "如何使用？",
           answer: "在一个站点借取充电宝，在任意其他站点归还。按使用时间付费。"
         },
         q2: {
           question: "需要安装应用吗？",
           answer: "取决于选择的支付流程。通常可以使用银行卡/应用支付。"
         },
         q3: {
           question: "为什么看不到地图？",
           answer: "地图使用Google地图，需要同意第三方Cookie。列表始终可见。"
         },
         q4: {
           question: "如果不归还充电宝会怎样？",
           answer: "如果在借取后24小时内未归还充电宝，将自动从使用的银行卡中扣除30欧元罚款。在这种情况下，设备将成为您的财产。"
         }
       },
       contact: {
         title: "联系我们",
         subtitle: "给我们写信，我们会快速回复。",
         email: {
           label: "电子邮件",
           cta: "发送邮件"
         }
       },
       footer: {
         tagline: "共享充电宝服务。随时随地充电。",
         links: {
           title: "链接"
         },
         legal: {
           title: "法律信息",
           privacy: "隐私政策",
           cookies: "Cookie政策"
         },
         contact: {
           title: "联系我们"
         },
         company: "PLUGHUB是Wee S.R.L.S.的品牌",
         copyright: "版权所有 © 2026"
       }
     },
     ja: {
       meta: {
         title: "PLUGHUB | イタリア モバイルバッテリーシェアリング",
         description: "PLUGHUB - イタリアのモバイルバッテリーシェアリングサービス。近くのステーションを見つけて、ワンタップでナビゲーションを取得。"
       },
       cookie: {
         title: "簡易通知：",
         message: "このサイトは技術的なCookieと第三者サービス（Googleマップ）を使用してマップを表示します。同意すると、Googleマップの使用を許可することになります。拒否した場合、ステーションリストは表示されますが、マップは無効のままになります。",
         accept: "同意する",
         reject: "拒否する",
         policy: "Cookieポリシー"
       },
       nav: {
         map: "マップ",
         prices: "料金",
         venues: "店舗向け",
         faq: "よくある質問",
         contact: "お問い合わせ",
         partner: "パートナーになる"
       },
       hero: {
         badge: "モバイルバッテリーシェアリング",
         title: "いつでも<span class='text-brand-blue'>充電</span>を。",
         subtitle: "近くのステーションを見つけて、モバイルバッテリーを借りて、一日を続けましょう。どのステーションでも返却できます。",
         cta: {
           find: "ステーションを探す",
           partner: "パートナーになる"
         },
         stats: {
           price: "30分ごと",
           staff: "スタッフ管理",
           stations: "ステーション"
         },
         card: {
           title: "マップ + リスト",
           subtitle: "店舗を選択してナビゲーションを開きます。",
           description: "マップ上ですべてのステーションを確認でき、左側には店舗の完全なリストが表示されます。店舗をタップして詳細を確認し、Googleマップでナビゲーションを取得します。"
         }
       },
       map: {
         title: "PLUGHUBステーション",
         subtitle: "左側にリスト、右側にマップ。店舗をクリックして詳細を確認し、ナビゲーションを開きます。",
         showAll: "すべて表示",
         list: {
           title: "店舗",
           total: "合計",
           hint: "ヒント：距離を表示するには位置情報を許可してください。"
         },
         overlay: {
           title: "マップ無効",
           message: "インタラクティブマップを表示するには、第三者Cookie（Googleマップ）を受け入れてください。店舗リストは常に利用可能です。",
           cta: "同意してマップを表示",
           policy: "Cookieポリシーを読む"
         },
         card: {
           payment: "支払い方法：",
           available: "個のバッテリー利用可能",
           directions: "ナビゲーション"
         }
       },
       prices: {
         title: "透明な料金体系",
         subtitle: "使用した時間だけお支払い。サブスクリプションなし、予期しない料金なし。",
         badge: "使って支払う",
         rate: {
           title: "料金",
           item1: "30分ごとに<strong class='text-white'>1€</strong>",
           item2: "借りる際に支払い",
           item3: "どのステーションでも返却可能"
         },
         card: {
           label: "料金",
           period: "30分ごと",
           simple: "シンプルで透明"
         },
         secure: "非接触型POSで安全な支払い"
       },
       partnership: {
         badge: "パートナーシップ",
         title: "あなたの店舗でPLUGHUBをホスティング",
         subtitle: "インストールコストゼロ。レンタルごとに手数料。スタッフ管理ゼロ。",
         feature1: {
           title: "顧客を引き付ける",
           desc: "認知価値を高める便利なサービス。"
         },
         feature2: {
           title: "収益シェア",
           desc: "投資なしでレンタルごとに収益。"
         },
         cta: {
           contact: "お問い合わせ",
           map: "マップを見る"
         },
         requirements: {
           title: "必要なものは？",
           item1: "レジ近くの目立つ場所",
           item2: "電源コンセント",
           item3: "スタッフは何も管理しません",
           note: "お問い合わせいただければ、2分以内に提案をお送りします。"
         }
       },
       faq: {
         title: "よくある質問",
         subtitle: "よくある質問への迅速な回答。",
         q1: {
           question: "どのように使いますか？",
           answer: "ステーションでモバイルバッテリーを借りて、他の任意のステーションで返却します。時間に応じて支払います。"
         },
         q2: {
           question: "アプリをインストールする必要がありますか？",
           answer: "選択した支払いフローによります。一般的にカード/アプリで支払うことができます。"
         },
         q3: {
           question: "マップが表示されないのはなぜですか？",
           answer: "マップはGoogleマップを使用し、第三者Cookieの同意が必要です。リストは常に表示されます。"
         },
         q4: {
           question: "モバイルバッテリーを返却しない場合はどうなりますか？",
           answer: "借りてから24時間以内にモバイルバッテリーを返却しない場合、使用したカードに30€のペナルティが自動的に請求されます。この場合、デバイスはあなたの所有物になります。"
         }
       },
       contact: {
         title: "お問い合わせ",
         subtitle: "お問い合わせいただければ、迅速に対応いたします。",
         email: {
           label: "メール",
           cta: "メールを送る"
         }
       },
       footer: {
         tagline: "モバイルバッテリーシェアリングサービス。いつでもどこでも充電。",
         links: {
           title: "リンク"
         },
         legal: {
           title: "法的情報",
           privacy: "プライバシーポリシー",
           cookies: "Cookieポリシー"
         },
         contact: {
           title: "お問い合わせ"
         },
         company: "PLUGHUBはWee S.R.L.S.のブランドです",
         copyright: "全著作権所有 © 2026"
       }
     }
   };

   /** =========================
    *  CONFIG
    *  ========================= */
   const CONFIG = {
     // ⚠️ Inserisci qui la tua API KEY Google Maps (Maps JavaScript API).
     // Ricorda di proteggerla con restrizioni HTTP referrer nel Google Cloud Console.
     GOOGLE_MAPS_API_KEY: 'AIzaSyDDFfAuCP6wglFjfk-Dyt0ClhUAlm5kGNw',
   
     // Centro di default (Italia)
     DEFAULT_CENTER: { lat: 41.9028, lng: 12.4964 }, // Roma
     DEFAULT_ZOOM: 6,
   
     // localStorage key per il consenso
     COOKIE_CONSENT_KEY: 'plugHubCookieConsent',
   
     // localStorage key per la lingua
     LANGUAGE_KEY: 'plugHubLanguage',
   
     // Dati
     DATA_URL: 'locali.json',
   
     GOOGLE_MAPS_MAP_ID: 'DEMO_MAP_ID',
   };
   
   /** =========================
    *  STATE
    *  ========================= */
   let stations = [];
   let map = null;
   let markersById = new Map();
   let placesService = null;
   
   let selectedStationId = null;
   let userLatLng = null;
   let currentLanguage = 'it';
   
   /** =========================
    *  DOM
    *  ========================= */
   const el = {
     cookieBanner: document.getElementById('cookie-banner'),
     mapOverlay: document.getElementById('map-overlay'),
   
     btnAcceptCookies: document.getElementById('btn-accept-cookies'),
     btnRejectCookies: document.getElementById('btn-reject-cookies'),
     btnCloseCookie: document.getElementById('btn-close-cookie'),
   
     btnAcceptOverlay: document.getElementById('btn-accept-overlay'),
   
     stationList: document.getElementById('station-list'),
     stationCount: document.getElementById('station-count'),
     stationCountHero: document.getElementById('station-count-hero'),
   
     btnFitAll: document.getElementById('btn-fit-all'),
     btnZoomIn: document.getElementById('btn-zoom-in'),
     btnZoomOut: document.getElementById('btn-zoom-out'),
     btnRecenter: document.getElementById('btn-recenter'),
   
     // Card
     card: document.getElementById('station-card'),
     cardClose: document.getElementById('card-close'),
     cardTitle: document.getElementById('card-title'),
     cardAddress: document.getElementById('card-address'),
     cardPhoto: document.getElementById('card-photo'),
     cardDirections: document.getElementById('card-directions'),
     cardDistanceRow: document.getElementById('card-distance-row'),
     cardDistance: document.getElementById('card-distance'),
     cardHoursRow: document.getElementById('card-hours-row'),
     cardHours: document.getElementById('card-hours'),
     cardPrice: document.getElementById('card-price'),
     cardPayments: document.getElementById('card-payments'),
     cardAvailable: document.getElementById('card-available'),

     // Language selector
     langToggle: document.getElementById('lang-toggle'),
     langDropdown: document.getElementById('lang-dropdown'),
     currentLang: document.getElementById('current-lang'),
   };
   
   /** =========================
    *  Language Functions
    *  ========================= */
   function getStoredLanguage() {
     return localStorage.getItem(CONFIG.LANGUAGE_KEY) || 'it';
   }

   function setStoredLanguage(lang) {
     localStorage.setItem(CONFIG.LANGUAGE_KEY, lang);
   }

   function getNestedValue(obj, path) {
     return path.split('.').reduce((current, key) => current?.[key], obj);
   }

   function updatePageLanguage(lang) {
     const translations = TRANSLATIONS[lang];
     if (!translations) return;

     currentLanguage = lang;
     document.documentElement.lang = lang;

     // Update all elements with data-i18n attribute
     document.querySelectorAll('[data-i18n]').forEach(element => {
       const key = element.getAttribute('data-i18n');
       const value = getNestedValue(translations, key);
       
       if (value !== undefined) {
         const attr = element.getAttribute('data-i18n-attr');
         if (attr) {
           element.setAttribute(attr, value);
         } else {
           element.innerHTML = value;
         }
       }
     });

     // Update language selector display
     if (el.currentLang) el.currentLang.textContent = lang.toUpperCase();

     // Update active state in dropdown
     document.querySelectorAll('.lang-option, .lang-option-mobile').forEach(option => {
       option.classList.toggle('active', option.dataset.lang === lang);
     });

     // Update page title
     const titleElement = document.querySelector('title[data-i18n="meta.title"]');
     if (titleElement) {
       document.title = translations.meta.title;
     }
   }

   function toggleLanguageDropdown() {
     if (el.langDropdown) {
       el.langDropdown.classList.toggle('hidden');
       el.langToggle?.classList.toggle('active');
     }
   }

   function closeLanguageDropdowns() {
     if (el.langDropdown) {
       el.langDropdown.classList.add('hidden');
       el.langToggle?.classList.remove('active');
     }
   }

   function initLanguageSelector() {
     // Language toggle
     el.langToggle?.addEventListener('click', (e) => {
       e.stopPropagation();
       toggleLanguageDropdown();
     });

     // Language options
     document.querySelectorAll('.lang-option').forEach(option => {
       option.addEventListener('click', (e) => {
         e.stopPropagation();
         const lang = option.dataset.lang;
         if (lang && TRANSLATIONS[lang]) {
           setStoredLanguage(lang);
           updatePageLanguage(lang);
           closeLanguageDropdowns();
         }
       });
     });

     // Close dropdowns when clicking outside
     document.addEventListener('click', () => {
       closeLanguageDropdowns();
     });

     // Initialize with stored language
     const storedLang = getStoredLanguage();
     if (TRANSLATIONS[storedLang]) {
       updatePageLanguage(storedLang);
     }
   }
   
   /** =========================
    *  Utilities
    *  ========================= */
   function escapeHtml(str) {
     return String(str ?? '')
       .replaceAll('&', '&amp;')
       .replaceAll('<', '&lt;')
       .replaceAll('>', '&gt;')
       .replaceAll('"', '&quot;')
       .replaceAll("'", '&#039;');
   }
   
   function buildDirectionsUrl(station) {
     const destination =
       (typeof station.lat === 'number' && typeof station.lng === 'number')
         ? `${station.lat},${station.lng}`
         : (station.indirizzo || station.nome || '');
   
     // Google Maps URLs (no API key)
     let url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
     if (station.place_id) {
       url += `&destination_place_id=${encodeURIComponent(station.place_id)}`;
     }
     return url;
   }
   
   function toRad(v) { return (v * Math.PI) / 180; }
   
   /** Haversine distance in meters (fallback if geometry isn't available) */
   function haversineMeters(a, b) {
     const R = 6371000;
     const dLat = toRad(b.lat - a.lat);
     const dLng = toRad(b.lng - a.lng);
     const s1 = Math.sin(dLat / 2);
     const s2 = Math.sin(dLng / 2);
     const c = s1 * s1 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * s2 * s2;
     return 2 * R * Math.asin(Math.sqrt(c));
   }
   
   function formatDistance(meters) {
     if (!Number.isFinite(meters)) return null;
     if (meters < 1000) return `${Math.round(meters)} m`;
     return `${(meters / 1000).toFixed(1)} km`;
   }
   
   function getConsent() {
     return localStorage.getItem(CONFIG.COOKIE_CONSENT_KEY);
   }
   
   function setConsent(value) {
     localStorage.setItem(CONFIG.COOKIE_CONSENT_KEY, value);
   }
   
   /** =========================
    *  Cookie Banner
    *  ========================= */
   function showCookieBanner() { el.cookieBanner?.classList.remove('hidden'); }
   function hideCookieBanner() { el.cookieBanner?.classList.add('hidden'); }
   
   function acceptCookies() {
     setConsent('accepted');
     hideCookieBanner();
     enableMap();
   }
   
   function rejectCookies() {
     setConsent('rejected');
     hideCookieBanner();
     // Mappa resta bloccata
   }
   
   function closeCookieBanner() {
     hideCookieBanner();
     if (!getConsent()) setConsent('rejected');
   }
   
   /** =========================
    *  Mobile menu + FAQ
    *  ========================= */
   function wireUiBasics() {
     // Mobile menu (under 1024px)
     const mobileMenuBtn = document.getElementById('mobile-menu-btn');
     const mobileMenu = document.getElementById('mobile-menu');
     let isMenuOpen = false;
   
     mobileMenuBtn?.addEventListener('click', () => {
       isMenuOpen = !isMenuOpen;
       if (isMenuOpen) {
         mobileMenu?.classList.remove('hidden');
         mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark text-2xl"></i>';
       } else {
         mobileMenu?.classList.add('hidden');
         mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-2xl"></i>';
       }
     });
   
     mobileMenu?.querySelectorAll('a').forEach((link) => {
       link.addEventListener('click', () => {
         isMenuOpen = false;
         mobileMenu.classList.add('hidden');
         mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-2xl"></i>';
       });
     });
   
     // Navbar scroll effect
     const navbar = document.getElementById('navbar');
     window.addEventListener('scroll', () => {
       if (!navbar) return;
       if (window.scrollY > 10) {
         navbar.classList.add('shadow-lg');
         navbar.style.background = 'rgba(17, 17, 17, 0.98)';
       } else {
         navbar.classList.remove('shadow-lg');
         navbar.style.background = 'rgba(17, 17, 17, 0.95)';
       }
     });
   
     // Smooth scroll
     document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
       anchor.addEventListener('click', function (e) {
         const href = this.getAttribute('href');
         if (!href || href === '#') return;
         const target = document.querySelector(href);
         if (!target) return;
         e.preventDefault();
         target.scrollIntoView({ behavior: 'smooth', block: 'start' });
       });
     });
   
     // FAQ
     document.querySelectorAll('[data-faq]').forEach((btn) => {
       btn.addEventListener('click', () => {
         const item = btn.closest('.faq-item');
         if (!item) return;
         const isActive = item.classList.contains('active');
         document.querySelectorAll('.faq-item').forEach((x) => x.classList.remove('active'));
         if (!isActive) item.classList.add('active');
       });
     });
   }
   
   /** =========================
    *  Data & List
    *  ========================= */
   async function loadStations() {
     const res = await fetch(CONFIG.DATA_URL, { cache: 'no-store' });
     if (!res.ok) throw new Error(`Impossibile caricare ${CONFIG.DATA_URL}`);
     const data = await res.json();
   
     // Normalizza: accetta sia array che {stations:[]}
     const list = Array.isArray(data) ? data : (data?.stations ?? []);
     stations = list
       .map((s, idx) => ({
         id: String(s.id ?? idx),
         nome: s.nome ?? 'Stazione',
         indirizzo: s.indirizzo ?? '',
         lat: typeof s.lat === 'number' ? s.lat : Number(s.lat),
         lng: typeof s.lng === 'number' ? s.lng : Number(s.lng),
         place_id: s.place_id || '',
         photoUrl: s.photoUrl || s.photo_url || '',
         orari: s.orari || '',
         tariffa: s.tariffa || '1€ / 30 min',
         pagamento: s.pagamento || 'Carta, App',
         powerbankDisponibili: (s.powerbankDisponibili ?? s.powerbank_disponibili ?? null),
         // runtime:
         distanceMeters: null,
         distanceText: null,
       }))
       .filter((s) => Number.isFinite(s.lat) && Number.isFinite(s.lng));
   
     // Aggiorna contatori
     if (el.stationCount) el.stationCount.textContent = String(stations.length);
     if (el.stationCountHero) el.stationCountHero.textContent = String(stations.length);
   
     renderStationList();
   }
   
   /** Crea item list */
   function renderStationList() {
     if (!el.stationList) return;
     el.stationList.innerHTML = '';
   
     for (const s of stations) {
       const li = document.createElement('li');
   
       const btn = document.createElement('button');
       btn.type = 'button';
       btn.className = 'station-item w-full';
       btn.dataset.stationId = s.id;
   
       const title = escapeHtml(s.nome);
       const address = escapeHtml(s.indirizzo);
   
       const distance = s.distanceText ? `<span class="station-pill">${escapeHtml(s.distanceText)}</span>` : `<span class="station-pill">—</span>`;
       const avail = (s.powerbankDisponibili === null || s.powerbankDisponibili === undefined)
         ? '—'
         : escapeHtml(String(s.powerbankDisponibili));
   
       btn.innerHTML = `
         <div class="flex items-start justify-between gap-3">
           <div class="min-w-0">
             <div class="station-title truncate">${title}</div>
             <div class="station-meta mt-1 line-clamp-2">${address}</div>
           </div>
           <div class="text-brand-blue"><i class="fa-solid fa-location-dot"></i></div>
         </div>
   
         <div class="station-actions">
           ${distance}
           <span class="station-pill"><i class="fa-solid fa-bolt" style="margin-right:6px"></i>${avail}</span>
           <a class="station-directions" href="${buildDirectionsUrl(s)}" target="_blank" rel="noopener" data-dir>
             ${TRANSLATIONS[currentLanguage]?.map?.card?.directions || 'Indicazioni'}
           </a>
         </div>
       `;
   
       // Se clicchi "Indicazioni", non selezionare
       btn.querySelector('[data-dir]')?.addEventListener('click', (ev) => ev.stopPropagation());
   
       btn.addEventListener('click', () => selectStation(s.id, { fromList: true }));
   
       li.appendChild(btn);
       el.stationList.appendChild(li);
     }
   
     syncListActive();
   }
   
   function syncListActive() {
     if (!el.stationList) return;
     el.stationList.querySelectorAll('[data-station-id]').forEach((node) => {
       node.classList.toggle('active', node.dataset.stationId === selectedStationId);
     });
   }
   
   function updateDistanceUi() {
     // Aggiorna distances in stations + rerender list pills quickly
     renderStationList();
     // Se c'è una card aperta, aggiorna anche quella
     if (selectedStationId) {
       const s = stations.find((x) => x.id === selectedStationId);
       if (s) openStationCard(s, { keepMapPan: true });
     }
   }
   
   /** =========================
    *  Card
    *  ========================= */
   function closeStationCard() {
     el.card?.classList.add('hidden');
   }
   
   function openStationCard(station, options = {}) {
     if (!station) return;
   
     // Foto: preferisci photoUrl o Places (se disponibile)
     const fallbackPhoto = 'logo.png';
   
     el.cardTitle.textContent = station.nome || 'Stazione';
     el.cardAddress.textContent = station.indirizzo || '';
   
     // distance
     if (station.distanceText) {
       el.cardDistanceRow.classList.remove('hidden');
       el.cardDistance.textContent = station.distanceText;
     } else {
       el.cardDistanceRow.classList.add('hidden');
     }
   
     // orari
     const hoursText = station.orari || '';
     if (hoursText) {
       el.cardHoursRow.classList.remove('hidden');
       el.cardHours.textContent = hoursText;
     } else {
       el.cardHoursRow.classList.add('hidden');
     }
   
     // tariffa / pagamenti
     el.cardPrice.textContent = station.tariffa || '1€ / 30 min';
     el.cardPayments.textContent = station.pagamento || 'Carta, App';
   
     // availability
     el.cardAvailable.textContent =
       (station.powerbankDisponibili === null || station.powerbankDisponibili === undefined)
         ? '—'
         : String(station.powerbankDisponibili);
   
     el.cardDirections.href = buildDirectionsUrl(station);
   
     // image: immediate fallback, then try place photo if needed
     el.cardPhoto.src = station.photoUrl || fallbackPhoto;
     el.cardPhoto.alt = station.nome || 'Foto locale';
   
     el.card.classList.remove('hidden');
   
     // On map: pan + maybe zoom
     if (!options.keepMapPan && map && Number.isFinite(station.lat) && Number.isFinite(station.lng)) {
       const pos = { lat: station.lat, lng: station.lng };
       map.panTo(pos);
       if (map.getZoom() < 13) map.setZoom(13);
     }
   
     // Try Places Details for photo/hours/address if place_id present and map enabled
     if (placesService && station.place_id) {
       placesService.getDetails(
         {
           placeId: station.place_id,
           fields: ['name', 'formatted_address', 'opening_hours', 'photos'],
         },
         (place, status) => {
           if (status !== google.maps.places.PlacesServiceStatus.OK || !place) return;
   
           // Update info if missing/placeholder
           if (place.name && (!station.nome || station.nome === 'Stazione')) {
             el.cardTitle.textContent = place.name;
           }
           if (place.formatted_address && !station.indirizzo) {
             el.cardAddress.textContent = place.formatted_address;
           }
   
           // Opening hours: show "Aperto ora" if possible
           if (place.opening_hours && typeof place.opening_hours.isOpen === 'function') {
             const isOpen = place.opening_hours.isOpen();
             el.cardHoursRow.classList.remove('hidden');
             const openText = TRANSLATIONS[currentLanguage]?.map?.card?.openNow || (isOpen ? 'Aperto ora' : 'Chiuso ora');
             el.cardHours.textContent = isOpen ? (TRANSLATIONS[currentLanguage]?.map?.card?.openNow || 'Aperto ora') : (TRANSLATIONS[currentLanguage]?.map?.card?.closedNow || 'Chiuso ora');
           }
   
           // Photo
           if (place.photos && place.photos.length) {
             const url = place.photos[0].getUrl({ maxWidth: 900, maxHeight: 600 });
             el.cardPhoto.src = url;
           }
         }
       );
     }
   }
   
   /** =========================
    *  Selection
    *  ========================= */
   function selectStation(id, { fromList = false } = {}) {
     const s = stations.find((x) => x.id === id);
     if (!s) return;
   
     selectedStationId = id;
     syncListActive();
     openStationCard(s);
   
     // Se arriva dalla lista su mobile, assicurati che l'utente veda la mappa + card
     if (fromList && window.matchMedia('(max-width: 1023px)').matches) {
       document.getElementById('map-canvas')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
     }
   
     // Se marker esiste, porta sopra
     const marker = markersById.get(id);
     if (marker?.position && map) {
       map.panTo(marker.position);
     }
   }
   
   /** =========================
    *  Google Maps
    *  ========================= */
   
   // Dark theme style
   const mapDarkStyle = [
     { elementType: 'geometry', stylers: [{ color: '#111111' }] },
     { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
     { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
     { elementType: 'labels.text.stroke', stylers: [{ color: '#111111' }] },
     { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#757575' }] },
     { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
     { featureType: 'administrative.land_parcel', stylers: [{ visibility: 'off' }] },
     { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#bdbdbd' }] },
     { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
     { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#181818' }] },
     { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
     { featureType: 'road', elementType: 'geometry.fill', stylers: [{ color: '#2c2c2c' }] },
     { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] },
     { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#373737' }] },
     { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#3c3c3c' }] },
     { featureType: 'road.highway.controlled_access', elementType: 'geometry', stylers: [{ color: '#4e4e4e' }] },
     { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
     { featureType: 'transit', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
     { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0f0f0f' }] },
     { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#3d3d3d' }] },
   ];
   
   function enableMap() {
     // Se manca la key, evita errori e lascia overlay
     if (!CONFIG.GOOGLE_MAPS_API_KEY || CONFIG.GOOGLE_MAPS_API_KEY === 'INSERISCI_LA_TUA_API_KEY') {
       console.warn('Inserisci la tua GOOGLE_MAPS_API_KEY in app.js');
       return;
     }
   
     // Se già caricata
     if (window.google && window.google.maps) {
       window.initMap();
       return;
     }
   
     const script = document.createElement('script');
   
     // Libraries:
     // - marker: AdvancedMarkerElement
     // - places: per foto/orari (facoltativo ma utile per la card)
     // - geometry: per distanze (facoltativo)
     script.src = `https://maps.googleapis.com/maps/api/js?key=${CONFIG.GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=marker,places,geometry`;
     script.async = true;
     script.defer = true;
     script.onerror = () => console.error('Errore nel caricamento Google Maps API');
     document.head.appendChild(script);
   }
   
   window.initMap = function initMap() {
     // Se non ci sono stazioni, crea una mappa vuota
     const first = stations[0];
     const center = first ? { lat: first.lat, lng: first.lng } : CONFIG.DEFAULT_CENTER;
   
     map = new google.maps.Map(document.getElementById('map-canvas'), {
       center,
       zoom: first ? 12 : CONFIG.DEFAULT_ZOOM,
       styles: mapDarkStyle,
       mapTypeControl: false,
       streetViewControl: false,
       fullscreenControl: false,
       zoomControl: false,
       mapId: CONFIG.GOOGLE_MAPS_MAP_ID, 
       gestureHandling: 'cooperative',
     });
   
     // Places service (per dettagli)
     placesService = new google.maps.places.PlacesService(map);
   
     // Marker pin
     const pin = new google.maps.marker.PinElement({
       background: '#41B3E7',
       borderColor: '#ffffff',
       glyphColor: '#111111',
     });
   
     // Markers
     markersById.clear();
     for (const s of stations) {
       const marker = new google.maps.marker.AdvancedMarkerElement({
         map,
         position: { lat: s.lat, lng: s.lng },
         title: s.nome,
         content: pin.element.cloneNode(true),
       });
   
       marker.addListener('click', () => selectStation(s.id));
       markersById.set(s.id, marker);
     }
   
     // Click on map closes card
     map.addListener('click', () => closeStationCard());
   
     // Hide overlay
     el.mapOverlay?.classList.add('hidden');
   
     // Wire controls
     wireMapControls();
   
     // Fit all once
     fitAllStations();
   
     // If a station already selected (rare), refresh
     if (selectedStationId) selectStation(selectedStationId);
   };
   
   function wireMapControls() {
     el.btnZoomIn?.addEventListener('click', () => { if (map) map.setZoom(map.getZoom() + 1); });
     el.btnZoomOut?.addEventListener('click', () => { if (map) map.setZoom(map.getZoom() - 1); });
     el.btnRecenter?.addEventListener('click', () => fitAllStations());
     el.btnFitAll?.addEventListener('click', () => fitAllStations());
   }
   
   function fitAllStations() {
     if (!map || stations.length === 0) return;
   
     const bounds = new google.maps.LatLngBounds();
     for (const s of stations) bounds.extend({ lat: s.lat, lng: s.lng });
     map.fitBounds(bounds);
   
     // Clamp zoom a bit (fitBounds can zoom too much for very close points)
     setTimeout(() => {
       if (!map) return;
       const z = map.getZoom();
       if (z > 16) map.setZoom(16);
     }, 250);
   }
   
   /** =========================
    *  Geolocation for distance
    *  ========================= */
   function initGeolocation() {
     if (!navigator.geolocation) return;
   
     navigator.geolocation.getCurrentPosition(
       (pos) => {
         userLatLng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
   
         // compute distances
         for (const s of stations) {
           const meters = haversineMeters(userLatLng, { lat: s.lat, lng: s.lng });
           s.distanceMeters = meters;
           s.distanceText = formatDistance(meters);
         }
   
         // sort list by distance (optional) – comment out if you prefer fixed order
         stations.sort((a, b) => (a.distanceMeters ?? Infinity) - (b.distanceMeters ?? Infinity));
   
         updateDistanceUi();
       },
       () => {
         // user denied; ignore
       },
       { enableHighAccuracy: false, timeout: 5000, maximumAge: 600000 }
     );
   }
   
   /** =========================
    *  Boot
    *  ========================= */
   document.addEventListener('DOMContentLoaded', async () => {
     wireUiBasics();

     // Initialize language selector
     initLanguageSelector();
   
     // Cookie banner actions
     el.btnAcceptCookies?.addEventListener('click', acceptCookies);
     el.btnRejectCookies?.addEventListener('click', rejectCookies);
     el.btnCloseCookie?.addEventListener('click', closeCookieBanner);
     el.btnAcceptOverlay?.addEventListener('click', acceptCookies);
   
     // Card close
     el.cardClose?.addEventListener('click', closeStationCard);
   
     // Load stations and render list
     try {
       await loadStations();
     } catch (err) {
       console.error(err);
       if (el.stationList) {
         el.stationList.innerHTML = '<li class="text-gray-400 p-4">Errore nel caricamento dei locali. Controlla <code>locali.json</code>.</li>';
       }
     }
   
     // Geolocation (distance)
     initGeolocation();
   
     // Cookie consent - con supporto per "Modifica preferenze"
     const urlParams = new URLSearchParams(window.location.search);
     const shouldOpenBanner = urlParams.get('openCookieBanner') === '1';

     if (shouldOpenBanner) {
       // Rimuovi il parametro dall'URL senza ricaricare
       window.history.replaceState({}, '', window.location.pathname);
       // Resetta il consenso per forzare la visualizzazione del banner
       localStorage.removeItem(CONFIG.COOKIE_CONSENT_KEY);
     }

     const consent = getConsent();
     if (consent === 'accepted') {
       hideCookieBanner();
       enableMap();
     } else if (consent === 'rejected') {
       hideCookieBanner();
       // overlay remains visible
     } else {
       showCookieBanner();
     }
   });
   
   // Expose for inline safety (non serve più, ma utile se vuoi richiamare da HTML)
   window.acceptCookies = acceptCookies;
   window.rejectCookies = rejectCookies;
   window.closeCookieBanner = closeCookieBanner;
