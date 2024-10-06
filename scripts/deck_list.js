window.onload = function () {
  const deck_list = document.getElementById('deck_list');

  const TITLE_ROW = 0;
  const ID_COLUMN = 0;
  const FAVOLITE_COLUMN = 1;
  const DECKNAME_COLUMN = 2;
  const DESCRIPTION_COLUMN = 3;
  const DECKCODE_COLUMN = 4;
  const OCGDB_LINK_COLUMN = 5;

  // csvファイルの情報を読み込み
  function csv_data(dataPath) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', (event) => {
      const response = event.target.responseText;
      const csv_array = convertCsvtoArray(response);
      translateHtml(csv_array);
    });

    request.open('GET', dataPath, true);
    request.send();
  }

  // csvファイルの内容を配列形式に変換
  function convertCsvtoArray(raw_data) {
    const dataArray = [];
    const dataString = raw_data.split('\n').filter(Boolean);

    console.log(dataString);
    for (const data of dataString) {
      dataArray.push(data.split(','));
    }

    return dataArray;
  }

  // HTML形式に変換
  function translateHtml(csv_array) {
    let output_element = '<caption style="text-align: left;"><span style="color: gold; font-size:x-large;">★</span> ... 個人的なお気に入り</caption>';
    csv_array.forEach((element, row_index) => {
      output_element += '<tr>';
      let isFavoriteDeck = false;

      element.forEach((childElement, child_index) => {

        const className = getClassName(row_index, child_index);
        let result_child_element = childElement;

        if (row_index > TITLE_ROW) {
          if (child_index == OCGDB_LINK_COLUMN) {
            result_child_element = translateOcgdbLink(childElement);
          }
          else if (isFavoriteDeck) {
            result_child_element = addFavoriteMark(childElement);
            isFavoriteDeck = false;
          }
        }

        if (child_index == FAVOLITE_COLUMN) {
          isFavoriteDeck = childElement.trim().length > 0;
          return;
        }
        output_element += `<td class="${className}">${result_child_element}</td>`
      });
      output_element += '</tr>';
    });

    deck_list.innerHTML = output_element;
  }

  // クラス名を取得
  function getClassName(row_index, child_index) {
    let class_name = '';
    switch (child_index) {
      case ID_COLUMN:
        class_name += 'number';
        break;
      case DECKNAME_COLUMN:
        class_name += 'deck_name';
        if (row_index == 0) {
          class_name += ' deck_name_title';
        }
        break;
      case DESCRIPTION_COLUMN:
        class_name += 'deck_description';
        if (row_index == 0) {
          class_name += ' deck_description_title';
        }
        break;
      case DECKCODE_COLUMN:
        class_name += 'deck_code';
        break;
      case OCGDB_LINK_COLUMN:
        class_name += 'to_ocgdb';
        break;
    }

    return class_name;
  }

  // OCGDB用のリンクHTMLに変換
  function translateOcgdbLink(element) {
    const base_link_html = '<a href="$" target="_blank" rel="noopener"><img class="deck-icon" src="./img/cards_0w1vr3ncgnpn.svg" title="デッキ構築を見る"/></a>';
    return base_link_html.replace('$', element);
  }

  // お気に入りマークの付与
  function addFavoriteMark(element) {
    return '<span style="color: gold; font-size:x-large;">★</span>' + element;
  }

  csv_data('deck/deck.csv');
}