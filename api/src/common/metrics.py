class _Metrics:
    _multiflash_calculation_count: int = 0
    _fetch_components_count: int = 0

    @property
    def multiflash_calculation_count(self) -> int:
        return self._multiflash_calculation_count

    @property
    def fetch_components_count(self) -> int:
        return self._fetch_components_count

    def increase_multiflash_calculation_count(self) -> None:
        """Increase multiflash calculation count by 1."""
        self._multiflash_calculation_count += 1

    def increase_fetch_components_count(self) -> None:
        """Increase fetch components count by 1."""
        self._fetch_components_count += 1


metrics = _Metrics()
