var quickReplies = {
  fulfillmentMessages: [
    {
      quickReplies: {
        title:
          "Bem vindo ao CasperBot, que tipo de noticia você gostaria de ver?",
        quickReplies: ["Esporte", "Politica", "Entretenimento", "Famosos"],
      },
      platform: "FACEBOOK",
    },
  ],
}





var noticiasCarr = {
  fulfillmentMessages: [
    {
      payload: {
        facebook: {
          attachment: {
            payload: {
              elements: [],
              template_type: "generic",
            },
            type: "template",
          },
        },
      },
      platform: "FACEBOOK",
    },
    {
      "text": {
        "text": [
          "Caso queira ver outras noticias, digite noticias"
        ]
      },
      "platform": "FACEBOOK"
    },
  ],
};


var apologies = {
  fulfillmentMessages: [
    {
      quickReplies: {
        title:
          "Perdão infelizmente não possuo noticias sobre este assunto agora.",
        quickReplies: ["Esporte", "Politica", "Entretenimento", "Famosos"],
      },
      platform: "FACEBOOK",
    },
  ],
};

function createElements(posts) {
  var json = {
    elements: [],
  };
  posts.forEach((post) => {
    json.elements.push({
      title: post.title,
      subtitle: post.description,
      image_url: post.imgUrl,
      buttons: [
        {
          type: "web_url",
          title: "Ver noticia",
          url: post.link,
        },
      ],
    });
  });
  return json;
}

exports.noticiasCarr = noticiasCarr;
exports.apologies = apologies;
exports.quickReplies = quickReplies;
exports.createElements = createElements;
