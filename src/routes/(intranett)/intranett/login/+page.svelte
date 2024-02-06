<script lang="ts">
    import {Accordion, AccordionItem} from '@skeletonlabs/skeleton';
</script>

<div class="w-full my-40 grid justify-center text-center gap-10">
    <div>
        <h1 class="text-5xl">Logg inn</h1>
        <p style="margin-top: 10px">Logg inn med Google eller Microsoft konto fra godkjente domene.</p>
    </div>
    <div>
        <div style="display: inline-block;margin-bottom: 10px">
            <a
                    class="flex justify-center px-4 py-2 border gap-2 bg-white border-slate-700 rounded-lg text-slate-700 focus:ring-gray-500 focus:ring-offset-gray-200 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                    href="/intranett/login/google"
                    style="margin-bottom: 20px"
            >
                <img
                        class="w-6 h-6"
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        loading="lazy"
                        alt="google logo"
                />
                <span>Logg inn med Google</span>
            </a>
            <a
                    class="flex justify-center px-4 py-2 border gap-2 bg-white border-slate-700 rounded-lg text-slate-700 focus:ring-gray-500 focus:ring-offset-gray-200 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                    href="/intranett/login/microsoft"
            >
                <img
                        class="w-6 h-6"
                        src="https://www.svgrepo.com/show/448239/microsoft.svg"
                        loading="lazy"
                        alt="ms logo"
                />
                <span>Logg inn med Microsoft</span>
            </a>
        </div>
        <Accordion>
            <AccordionItem>
                <svelte:fragment slot="summary">
                    <div class="flex items-center w-full h-14" style="width: 400px">
                        <h2>Om innlogging med Microsoft</h2>
                    </div>
                </svelte:fragment>
                <svelte:fragment slot="content">
                    <div class="px-4 pb-2 space-y-8" style="width: 400px;text-align: left;">

                        <p style=" margin-left: auto; margin-right: auto;">For å benytte din Micrsoft konto til
                            pålogging må du registreres som gjest på Overhuset Intranett. Dette gjør
                            du selv på følgende måte:
                        </p>

                        <ol style="list-style: auto;list-style-position: inside;text-align: left;margin-left: auto;margin-right: auto;margin-top: 10px;">
                            <li>Trykk "Logg inn med Microsoft"</li>
                            <li>Trykk på "Opprett en konto" / "Create one!"</li>
                            <li>Velg "Registrer deg med Microsoft" / "Sign up with Microsoft"</li>
                            <li>Logg på med din Microsoft konto</li>
                            <li>Godta forespørsel om å dele informasjon</li>
                            <li>Fyll ut ytteligere detaljer</li>
                            <li>Godta ny forespørsel om å dele informasjon</li>
                        </ol>
                    </div>
                </svelte:fragment>
            </AccordionItem>
        </Accordion>

    </div>
</div>
