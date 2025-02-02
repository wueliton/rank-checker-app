function toURLFriendly(text: string) {
  // 1. Converte para minúsculas
  let url = text.toLowerCase();

  // 2. Substitui acentos e caracteres especiais
  url = url.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 3. Substitui espaços por hífens
  url = url.replace(/\s+/g, "-");

  // 4. Remove caracteres não permitidos (exceto letras, números e hífens)
  url = url.replace(/[^a-z0-9\-]/g, "");

  return url;
}

export default toURLFriendly;
