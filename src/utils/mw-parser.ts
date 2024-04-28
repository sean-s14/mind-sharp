export function mwParser(text: string) {
  // TODO: Full list at https://www.dictionaryapi.com/products/json#sec-2.tokens

  // Replace bold tokens
  text = text.replace(/{b}(.*?){\/b}/g, "<strong>$1</strong>");

  // Replace bold colon tokens
  text = text.replace(/{bc}/g, "<strong>:</strong> ");

  // Replace italics tokens
  text = text.replace(/{it}(.*?){\/it}/g, "<em>$1</em>");

  // Replace smallcaps tokens
  text = text.replace(
    /{sc}(.*?){\/sc}/g,
    '<span style="font-variant: small-caps;">$1</span>'
  );

  // Replace subscript tokens
  text = text.replace(/{inf}(.*?){\/inf}/g, "<sub>$1</sub>");

  // Replace superscript tokens
  text = text.replace(/{sup}(.*?){\/sup}/g, "<sup>$1</sup>");

  // Replace paragraph break tokens
  text = text.replace(/{p_br}/g, "<br/>");

  // Replace left double quote tokens
  text = text.replace(/{ldquo}/g, "“");

  // Replace right double quote tokens
  text = text.replace(/{rdquo}/g, "”");

  // Replace dx tokens
  text = text.replace(/ {dx}(.*?){\/dx}/g, "");

  // Replace dx_def tokens
  text = text.replace(/ {dx_def}(.*?){\/dx_def}/g, "");

  // Replace dx_ety tokens
  text = text.replace(/ {dx_ety}(.*?){\/dx_ety}/g, "");

  // Replace ma tokens
  text = text.replace(/ {ma}(.*?){\/ma}/g, "");

  // Replace d_link tokens
  text = text.replace(/{d_link\|(.*?)\|(.*?)}/g, "$1");

  // Replace sx tokens
  text = text.replace(/{sx\|(.*?)\|(.*?)}/g, "$1");

  // Replace wi tokens
  text = text.replace(/{wi}(.*?){\/wi}/g, "$1");

  return text;
}
