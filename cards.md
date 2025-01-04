---
layout: page
title: ゆゆキチカードコレクション
---
<table>
  {% for row in site.data.yuyukichicards %}
    {% if forloop.first %}
    <tr>
      {% for pair in row %}
        <th>{{ pair[0] }}</th>
      {% endfor %}
    </tr>
    {% endif %}

    {% tablerow pair in row %}
      {% if pair[0] == "URL" %}
        <a href="{{ pair[1] }}" target="_blank" rel="noopener"><span>𝕏</span></a>
      {% else %}
        {{ pair[1] }}
      {% endif %}
    {% endtablerow %}
  {% endfor %}
</table>