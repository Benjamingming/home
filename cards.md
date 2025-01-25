---
layout: page
title: ゆゆキチカードコレクション
---

<details>
  <summary>コレクションの獲得状況</summary>
  獲得全枚数:{{ site.data.yuyukichicards | size }}
  <table class="info_table" id="info_table">
    <thead>
      <tr>
        <th>星</th>
        <th>獲得枚数</th>
        <th>カード種類数</th>
        <th>獲得割合</th>
      </tr>
    </thead>
    <tbody style="text-align: center;">
    </tbody>
  </table>
</details>

<br>

<input type="text" id="dateSince" class="dateRangeFilter" placeholder="📅ここから"> ～ <input type="text" id="dateUntil" class="dateRangeFilter" placeholder="📅ここまで">
<button id="clearDateRange">クリア</button>

<table class="cards" id="cards">
  {% for row in site.data.yuyukichicards %}
    {% if forloop.first %}
    <thead>
      <tr>
        {% for pair in row %}
          <th>{{ pair[0] }}</th>
        {% endfor %}
      </tr>
    </thead>
    {% endif %}

    {% tablerow pair in row %}
      {% if pair[0] == "URL" %}
        <a href="{{ pair[1] }}" target='_blank' rel="noreferrer noopener"><span>𝕏</span></a>
      {% else %}
        {{ pair[1] }}
      {% endif %}
    {% endtablerow %}
  {% endfor %}
</table>

<script type="text/javascript" >
  $(document).ready(function() {

    var all_cards =  {{ site.data.yuyukichicards | jsonify }};
    
    var card_info_list = calculateCards(all_cards);

    var info_table = $("#info_table");
    card_info_list.forEach(function(card_info, index) {
      var row = $("<tr></tr>");

      for(var key in card_info) {
        var cell = $("<td></td>").text(card_info[key]);
        row.append(cell);
      }

      info_table.append(row);
    });

    var tableOptions = {
      "info": true,
      "paging": true,
      "searching": true,
      "ordering": true,
      "order": [[ 0, "desc"], [1, "asc"]],
      "language": {
        "emptyTable": "テーブルにデータがありません",
        "info": " _TOTAL_ 件中 _START_ から _END_ まで表示",
        "infoEmpty": " 0 件中 0 から 0 まで表示",
        "infoFiltered": "（全 _MAX_ 件より抽出）",
        "infoThousands": ",",
        "lengthMenu": "_MENU_ 件表示",
        "loadingRecords": "読み込み中...",
        "processing": "処理中...",
        "search": "検索:",
        "zeroRecords": "一致するレコードがありません",
        "paginate": {
          "first": "先頭",
          "last": "最終",
          "next": "次",
          "previous": "前"
        },
        "aria": {
          "sortAscending": ": 列を昇順に並べ替えるにはアクティブにする",
          "sortDescending": ": 列を降順に並べ替えるにはアクティブにする"
        },
        "thousands": ",",
        "buttons": {
          "colvis": "項目の表示\/非表示",
          "csv": "CSVをダウンロード",
          "collection": "コレクション"
        },
        "searchBuilder": {
          "add": "条件を追加",
          "button": {
            "0": "カスタムサーチ",
            "_": "カスタムサーチ (%d)"
          },
          "clearAll": "すべての条件をクリア",
          "condition": "条件",
          "conditions": {
            "date": {
              "after": "次の日付以降",
              "before": "次の日付以前",
              "between": "次の期間に含まれる",
              "empty": "空白",
              "equals": "次の日付と等しい",
              "not": "次の日付と等しくない",
              "notBetween": "次の期間に含まれない",
              "notEmpty": "空白ではない"
            },
            "number": {
              "between": "次の値の間に含まれる",
              "empty": "空白",
              "equals": "次の値と等しい",
              "gt": "次の値よりも大きい",
              "gte": "次の値以上",
              "lt": "次の値未満",
              "lte": "次の値以下",
              "not": "次の値と等しくない",
              "notBetween": "次の値の間に含まれない",
              "notEmpty": "空白ではない"
            },
            "string": {
              "contains": "次の文字を含む",
              "empty": "空白",
              "endsWith": "次の文字で終わる",
              "equals": "次の文字と等しい",
              "not": "次の文字と等しくない",
              "notEmpty": "空白ではない",
              "startsWith": "次の文字から始まる",
              "notContains": "次の文字を含まない",
              "notStartsWith": "次の文字で始まらない",
              "notEndsWith": "次の文字で終わらない"
            }
          },
          "data": "項目",
          "title": {
            "0": "カスタムサーチ",
            "_": "カスタムサーチ (%d)"
          },
          "value": "値"
        },
        "autoFill": {
          "cancel": "キャンセル",
          "fillHorizontal": "横でセルを書き込む",
          "fillVertical": "縦でセルを書き込む"
        }
      },
    }
    $('#cards').DataTable(tableOptions);

    const datepickerBase = {
            changeYear: true
          ,changeMonth: true
          ,prevText: "前月"
          ,nextText: "次月"
          ,monthNames: [ "1月","2月","3月","4月","5月","6月"
              ,"7月","8月","9月","10月","11月","12月" ]
          ,monthNamesShort: [ "１月","２月","３月","４月","５月","６月"
              ,"７月","８月","９月","１０月","１１月","１２月" ]
          ,dayNames: [ "日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日" ]
          ,dayNamesShort: [ "日曜","月曜","火曜","水曜","木曜","金曜","土曜" ]
          ,dayNamesMin: [ "日","月","火","水","木","金","土" ]
          ,weekHeader: "周"
          ,showWeek :false
          ,dateFormat: "yy/mm/dd"
          ,firstDay: 0 /* 週の開始を日曜にする */
          ,isRTL: false
          ,showMonthAfterYear: true
          ,yearSuffix: "年"
          ,showButtonPanel: true
          ,closeText : "閉じる"
          ,currentText:"今日"
          ,onSelect: function(date) {
              var since = $('#dateSince').val();
              var until = $('#dateUntil').val();
              var table = $('#cards').DataTable();

              table.search.fixed('range', function(searchStr, data, index){
                return isDateInRange(data[0], since, until);
              }).draw();
            }
    };

    $( ".dateRangeFilter" ).datepicker(datepickerBase);
  });

  function calculateCards(all_cards) {
    var card_info_list = [];
    for(var i = 0; i < 5; i++){
      var filterd_card_list = all_cards.filter(
        function(card){
          return card.星 == i + 1
        });

      var unique_card_list = Array.from(new Map(filterd_card_list.map(
          function(card){
            return [card.カード名, card]
          }
        )).values());

      card_info_list.push({
        "level": i + 1,
        "count": filterd_card_list.length,
        "unique_count": unique_card_list.length,
        "percentage": Math.round((filterd_card_list.length / all_cards.length) * 100) + "%",
      });
    }

    return card_info_list;
  }

  function isDateInRange(cardDate, since, until){
    if((since <= cardDate && until >= cardDate) || (!since && until >= cardDate) || (since <= cardDate && !until)) {
      console.log(since);
      return true;
    }

    return false;
  }

  $('#clearDateRange').on('click', function(){
    console.log("click");
    $('#dateSince').val("");
    $('#dateUntil').val("");
    var table = $('#cards').DataTable();
    table.search.draw();
  });
</script>

<!-- dataTables読み込み後に反映 -->
<style>
  table th {
    text-align: center !important;
  }

  table tr td.dt-type-numeric {
    text-align: center !important;
  }
</style>