---
layout: page
title: ゆゆキチカードコレクション
---

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
    var tableOptions = {
      "info": true,
      "paging": true,
      "searching": true,
      "ordering": true,
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
  });
</script>