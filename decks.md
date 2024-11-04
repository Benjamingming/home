---
layout: page
title: 遊戯王評価2以下デッキ一覧
---
<table>
  {% for row in site.data.deck %}
    {% if forloop.first %}
    <tr>
      {% for pair in row %}
        <th>{{ pair[0] }}</th>
      {% endfor %}
    </tr>
    {% endif %}

    {% tablerow pair in row %}
      {% if pair[0] == "構築" %}
        <a href="{{ pair[1] }}" target="_blank" rel="noopener">{% include image.html post=page.path file="cards.svg" class="deck-icon" %}</a>
      {% else %}
        {{ pair[1] }}
      {% endif %}
    {% endtablerow %}
  {% endfor %}
</table>