Feature: Buscar Cidadão por RG 

Scenario: Retorno de um cidadao atráves de um RG
    Given Usuario busca a rota "/wsCivil/BuscarCidadaoPorRG/{NumRG}"
    Then O Sistema retorna um cidadão válido

