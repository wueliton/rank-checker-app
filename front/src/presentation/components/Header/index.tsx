function Header() {
  return (
    <div className="flex gap-4">
      <img
        src="conceito-pub.png"
        alt="Conceito Publicidade"
        className="rounded-full border-black/5 border size-14"
      />
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold">Bem vindo(a) 👋</h3>
        <p className="text-black/40">Ranqueamento de Palavras-Chave</p>
      </div>
    </div>
  );
}

export default Header;
