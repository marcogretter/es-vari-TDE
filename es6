#include <stdio.h>
#include <stdlib.h>
#define N 5

typedef struct Date { int giorno;
    int mese;
    int anno;
} Data;

typedef struct Cli {
    int CodiceCliente;
    char * cognome, * nome;
    int puntiAccumulati;
    struct Cli * next;
} Cliente;

typedef Cliente * ListaDiClienti;

typedef struct ES {
    char * nomeProdotto;
    int prezzoUnitario;
    int quantitaAcquistata;
    struct ES * next;
} ElementoScontrino;

typedef ElementoScontrino * Scontrino;

typedef struct Sp { int CodiceCliente;
                    Scontrino s;
                    Data data;
                   struct Sp * next;
} Spesa;
typedef Spesa *ListaScontrini;

int CostoProdottiTot(Scontrino s);
void aggiornaPunti(ListaScontrini lisScontr,ListaDiClienti lisOfCli);
void trovaCliente(int CodCli,Scontrino s,ListaDiClienti lis);
void se5Mila(Data d,int CodClie,ListaScontrini scon,ListaDiClienti lisOfCli);

void aggiornaPunti(ListaScontrini lisScontr,ListaDiClienti lisOfCli)
{
    if(lisScontr==NULL)
        return;
    while (lisScontr!=NULL) {
        trovaCliente(lisScontr->CodiceCliente, lisScontr->s, lisOfCli);
        lisScontr=lisScontr->next;
    }
}
void cercasiCinqueMila(ListaScontrini lisScont,ListaDiClienti lisOfCli)
{
    if(lisScont==NULL)
        return;
    while (lisScont!=NULL) {
        se5Mila(lisScont->data, lisScont->CodiceCliente, lisScont, lisOfCli);
        lisScont=lisScont->next;
    }
    return;
}
void se5Mila(Data d,int CodClie,ListaScontrini scon,ListaDiClienti lisOfCli)
{
    int sum=0;
    if(scon==NULL)
        return;
    while (scon!=NULL) {
        if(scon->data.mese==d.mese&&scon->data.anno==d.anno&&CodClie==scon->CodiceCliente)
            sum+=CostoProdottiTot(scon->s);
        scon=scon->next;
    }
    if(sum>=5000)
        lisOfCli->puntiAccumulati+=(sum/10)*2;
    return;
}

void trovaCliente(int CodCli,Scontrino s,ListaDiClienti lis)
{
    if(lis==NULL)
        return;
    while (lis!=NULL) {
        if(lis->CodiceCliente==CodCli)
            lis->puntiAccumulati+=CostoProdottiTot(s);
        lis=lis->next;
    }
    return;
}

int CostoProdottiTot(Scontrino s)
{
    int sum=0;
    if(s==NULL)
        return 0;
    while (s!=NULL) {
        sum+=((s->prezzoUnitario)*(s->quantitaAcquistata));
        s=s->next;
    }
    return sum;
}
