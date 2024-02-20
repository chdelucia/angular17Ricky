/** export class CharlOLDComponent {
  id = input<number>(1);

  error = signal(null);

  character$!: Observable<Character | undefined>;

  item!: Signal<Character | undefined>;
  private injector = inject(Injector);

  loaded = computed(() => {
    return !!this.item()?.name;
  });

  ngOnInit(): void {
    this.character$ = this.characterService.getDetails(this.id()).pipe(
      take(1),
      catchError((error) => {
        this.error.set(error);
        return of(undefined);
      }),
    );
    this.item = toSignal(this.character$, { injector: this.injector });
  }

  goBack(): void {
    this.location.back();
  }
}
**/
