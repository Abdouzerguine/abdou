import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ShoppingBag, Star, Truck, CreditCard, HelpCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentLanguage } = useLanguage();
  const { stores, products } = useApp();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        addBotMessage(getTranslatedText('welcome_message'), [
          getTranslatedText('help_shopping'),
          getTranslatedText('find_products'),
          getTranslatedText('store_info'),
          getTranslatedText('shipping_info')
        ]);
      }, 500);
    }
  }, [isOpen]);

  const getTranslatedText = (key: string) => {
    const translations = {
      'ai_assistant': {
        en: 'AI Shopping Assistant',
        ar: 'مساعد التسوق الذكي',
        fr: 'Assistant Shopping IA'
      },
      'welcome_message': {
        en: "Hi! I'm Zara, your AI shopping assistant! 🛍️ I'm here to help you find the perfect products and guide you through your shopping journey. How can I assist you today?",
        ar: 'مرحباً! أنا زارا، مساعدة التسوق الذكية! 🛍️ أنا هنا لمساعدتك في العثور على المنتجات المثالية وإرشادك خلال رحلة التسوق. كيف يمكنني مساعدتك اليوم؟',
        fr: "Salut! Je suis Zara, votre assistante shopping IA! 🛍️ Je suis là pour vous aider à trouver les produits parfaits et vous guider dans votre parcours d'achat. Comment puis-je vous aider aujourd'hui?"
      },
      'help_shopping': {
        en: 'Help me shop',
        ar: 'ساعدني في التسوق',
        fr: 'Aidez-moi à faire du shopping'
      },
      'find_products': {
        en: 'Find products',
        ar: 'العثور على المنتجات',
        fr: 'Trouver des produits'
      },
      'store_info': {
        en: 'Store information',
        ar: 'معلومات المتجر',
        fr: 'Informations sur le magasin'
      },
      'shipping_info': {
        en: 'Shipping & delivery',
        ar: 'الشحن والتوصيل',
        fr: 'Expédition et livraison'
      },
      'type_message': {
        en: 'Type your message...',
        ar: 'اكتب رسالتك...',
        fr: 'Tapez votre message...'
      },
      'send': {
        en: 'Send',
        ar: 'إرسال',
        fr: 'Envoyer'
      },
      'typing': {
        en: 'Zara is typing...',
        ar: 'زارا تكتب...',
        fr: 'Zara tape...'
      }
    };
    return translations[key]?.[currentLanguage] || key;
  };

  const addBotMessage = (content: string, suggestions?: string[]) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      suggestions
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const generateBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Product search
    if (lowerMessage.includes('find') || lowerMessage.includes('search') || lowerMessage.includes('looking for') || 
        lowerMessage.includes('البحث') || lowerMessage.includes('أبحث') || lowerMessage.includes('cherche') || lowerMessage.includes('trouve')) {
      const suggestions = [
        'Electronics & gadgets',
        'Fashion & clothing',
        'Beauty & cosmetics',
        'Home & garden'
      ];
      return {
        content: currentLanguage === 'ar' 
          ? 'رائع! يمكنني مساعدتك في العثور على المنتجات المثالية. لدينا أكثر من ' + products.length + ' منتج من ' + stores.length + ' متجر. ما نوع المنتجات التي تبحث عنها؟'
          : currentLanguage === 'fr'
          ? 'Parfait! Je peux vous aider à trouver les produits parfaits. Nous avons plus de ' + products.length + ' produits de ' + stores.length + ' magasins. Quel type de produits recherchez-vous?'
          : 'Great! I can help you find the perfect products. We have over ' + products.length + ' products from ' + stores.length + ' stores. What type of products are you looking for?',
        suggestions
      };
    }

    // Shopping help
    if (lowerMessage.includes('shop') || lowerMessage.includes('buy') || lowerMessage.includes('purchase') ||
        lowerMessage.includes('تسوق') || lowerMessage.includes('شراء') || lowerMessage.includes('acheter')) {
      const suggestions = [
        'Browse categories',
        'View featured products',
        'Check store ratings',
        'Compare prices'
      ];
      return {
        content: currentLanguage === 'ar'
          ? 'سأكون سعيدة لمساعدتك في التسوق! إليك بعض النصائح: 1) تصفح الفئات للعثور على ما تحتاجه 2) تحقق من تقييمات المتاجر 3) قارن الأسعار 4) اقرأ مراجعات المنتجات. ما الذي تود شراؤه؟'
          : currentLanguage === 'fr'
          ? "Je serais ravie de vous aider à faire du shopping! Voici quelques conseils: 1) Parcourez les catégories pour trouver ce dont vous avez besoin 2) Vérifiez les évaluations des magasins 3) Comparez les prix 4) Lisez les avis produits. Qu'aimeriez-vous acheter?"
          : "I'd be happy to help you shop! Here are some tips: 1) Browse categories to find what you need 2) Check store ratings 3) Compare prices 4) Read product reviews. What would you like to buy?",
        suggestions
      };
    }

    // Shipping information
    if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery') || lowerMessage.includes('ship') ||
        lowerMessage.includes('شحن') || lowerMessage.includes('توصيل') || lowerMessage.includes('livraison')) {
      const suggestions = [
        'Delivery times',
        'Shipping costs',
        'Free shipping',
        'Track my order'
      ];
      return {
        content: currentLanguage === 'ar'
          ? 'نقوم بالشحن إلى جميع الولايات الـ 58 في الجزائر! 🚚 أوقات التوصيل: 1-3 أيام للمدن الكبرى، 3-7 أيام للمناطق النائية. العديد من المنتجات تأتي مع شحن مجاني! هل تريد معرفة تكلفة الشحن لمنطقتك؟'
          : currentLanguage === 'fr'
          ? 'Nous livrons dans les 58 wilayas d\'Algérie! 🚚 Délais de livraison: 1-3 jours pour les grandes villes, 3-7 jours pour les zones éloignées. Beaucoup de produits sont livrés gratuitement! Voulez-vous connaître les frais de livraison pour votre région?'
          : 'We ship to all 58 wilayas in Algeria! 🚚 Delivery times: 1-3 days for major cities, 3-7 days for remote areas. Many products come with free shipping! Would you like to know shipping costs for your area?',
        suggestions
      };
    }

    // Store information
    if (lowerMessage.includes('store') || lowerMessage.includes('shop') || lowerMessage.includes('vendor') ||
        lowerMessage.includes('متجر') || lowerMessage.includes('محل') || lowerMessage.includes('magasin')) {
      const suggestions = [
        'View all stores',
        'Store categories',
        'Top rated stores',
        'Local businesses'
      ];
      return {
        content: currentLanguage === 'ar'
          ? 'لدينا ' + stores.length + ' متجر رائع من جميع أنحاء الجزائر! 🏪 جميع متاجرنا محلية وموثقة. يمكنك تصفح المتاجر حسب الفئة أو الموقع. هل تبحث عن نوع معين من المتاجر؟'
          : currentLanguage === 'fr'
          ? 'Nous avons ' + stores.length + ' magasins fantastiques de toute l\'Algérie! 🏪 Tous nos magasins sont locaux et vérifiés. Vous pouvez parcourir les magasins par catégorie ou emplacement. Cherchez-vous un type spécifique de magasin?'
          : 'We have ' + stores.length + ' amazing stores from all over Algeria! 🏪 All our stores are local and verified. You can browse stores by category or location. Are you looking for a specific type of store?',
        suggestions
      };
    }

    // Payment information
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('cash') ||
        lowerMessage.includes('دفع') || lowerMessage.includes('نقد') || lowerMessage.includes('paiement')) {
      const suggestions = [
        'Cash on delivery',
        'Payment security',
        'Order confirmation',
        'Refund policy'
      ];
      return {
        content: currentLanguage === 'ar'
          ? 'نحن نقبل الدفع عند التسليم (COD) 💳 هذا يعني أنك تدفع فقط عندما تستلم طلبك! آمن وسهل. ستتلقى مكالمة تأكيد خلال 24 ساعة لتأكيد طلبك وترتيب التسليم.'
          : currentLanguage === 'fr'
          ? 'Nous acceptons le paiement à la livraison (COD) 💳 Cela signifie que vous ne payez que lorsque vous recevez votre commande! Sûr et facile. Vous recevrez un appel de confirmation dans les 24 heures pour confirmer votre commande et organiser la livraison.'
          : 'We accept Cash on Delivery (COD) 💳 This means you only pay when you receive your order! Safe and easy. You\'ll receive a confirmation call within 24 hours to confirm your order and arrange delivery.',
        suggestions
      };
    }

    // Default response
    const suggestions = [
      getTranslatedText('help_shopping'),
      getTranslatedText('find_products'),
      getTranslatedText('shipping_info'),
      'Contact support'
    ];
    
    return {
      content: currentLanguage === 'ar'
        ? 'أعتذر، لم أفهم سؤالك تماماً. يمكنني مساعدتك في العثور على المنتجات، معلومات الشحن، تفاصيل المتاجر، أو أي شيء آخر متعلق بالتسوق. كيف يمكنني مساعدتك؟'
        : currentLanguage === 'fr'
        ? "Désolée, je n'ai pas tout à fait compris votre question. Je peux vous aider à trouver des produits, des informations sur l'expédition, des détails sur les magasins, ou tout autre chose liée au shopping. Comment puis-je vous aider?"
        : "I'm sorry, I didn't quite understand your question. I can help you find products, shipping information, store details, or anything else shopping-related. How can I assist you?",
      suggestions
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateBotResponse(inputValue);
      setIsTyping(false);
      addBotMessage(response.content, response.suggestions);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    addUserMessage(suggestion);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateBotResponse(suggestion);
      setIsTyping(false);
      addBotMessage(response.content, response.suggestions);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-40 p-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-12 hover:shadow-purple-500/50 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="relative">
          <Bot className="h-7 w-7 animate-pulse" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <Sparkles className="h-2 w-2 text-white" />
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
          <div className="absolute top-2 left-2 w-1 h-1 bg-white/30 rounded-full animate-ping delay-300"></div>
          <div className="absolute bottom-3 right-2 w-1 h-1 bg-white/40 rounded-full animate-ping delay-700"></div>
          <div className="absolute top-4 right-3 w-1 h-1 bg-white/20 rounded-full animate-ping delay-1000"></div>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-96 h-[600px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 flex flex-col overflow-hidden transform transition-all duration-500 animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white">Zara</h3>
                <p className="text-xs text-purple-100">{getTranslatedText('ai_assistant')}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 transform hover:scale-110 hover:rotate-90"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-teal-500 to-blue-500' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                        : 'bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white border border-white/20 dark:border-gray-600/20'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                  
                  {/* Suggestions */}
                  {message.type === 'bot' && message.suggestions && (
                    <div className="mt-3 ml-10 space-y-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left px-3 py-2 text-xs bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-800/50 dark:hover:to-pink-800/50 transition-all duration-200 transform hover:scale-105 hover:shadow-md border border-purple-200/50 dark:border-purple-700/50"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white/80 dark:bg-gray-700/80 rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm border border-white/20 dark:border-gray-600/20">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/20">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={getTranslatedText('type_message')}
                  className="w-full px-4 py-3 pr-12 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                />
                <div className="absolute right-3 top-3.5">
                  <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;