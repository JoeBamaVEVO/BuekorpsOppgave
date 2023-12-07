CREATE TABLE `brukere` (
  `idBrukere` int(11) NOT NULL,
  `Brukernavn` varchar(45) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Passord` varchar(255) DEFAULT NULL,
  `isAdmin` int(11) DEFAULT 0,
  `Rettigheter_idRettigheter` int(11) NOT NULL DEFAULT 1
) 

--
-- Dataark for tabell `brukere`
--

INSERT INTO `brukere` (`idBrukere`, `Brukernavn`, `Email`, `Passord`, `isAdmin`, `Rettigheter_idRettigheter`) VALUES
(3, 'Admin', 'admin@placeholder.com', '$2b$10$Km/NuYapEvXIb4OP9UyLeu3U.iUF8IKMJ5wo1HF7mmAMI.bWjogSS', 1, 2);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `foresatt`
--

CREATE TABLE `foresatt` (
  `ForesattID` int(11) NOT NULL,
  `Fornavn` varchar(255) DEFAULT NULL,
  `Etternavn` varchar(255) DEFAULT NULL,
  `Telefon` int(11) DEFAULT NULL
) 

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `medlem`
--

CREATE TABLE `medlem` (
  `MedlemsID` int(11) NOT NULL,
  `Fornavn` varchar(255) DEFAULT NULL,
  `Etternavn` varchar(255) DEFAULT NULL,
  `Alder` int(11) DEFAULT NULL,
  `Adresse` varchar(255) DEFAULT NULL,
  `Postnummer` int(11) DEFAULT NULL,
  `Postadresse` varchar(255) DEFAULT NULL,
  `Tlf` int(11) DEFAULT NULL,
  `AntallAarSomMedlem` int(11) DEFAULT NULL,
  `Rang_idRang` int(11) NOT NULL,
  `Pelotong_idPelotong` int(11) NOT NULL
) 

--
-- Dataark for tabell `medlem`
--

INSERT INTO `medlem` (`MedlemsID`, `Fornavn`, `Etternavn`, `Alder`, `Adresse`, `Postnummer`, `Postadresse`, `Tlf`, `AntallAarSomMedlem`, `Rang_idRang`, `Pelotong_idPelotong`) VALUES
(2, 'k', 'k', 1, 'k', 1, 'k', 111, NULL, 1, 1),
(3, 'kd', 'd', 12, 'kk', 22, 'kkkk', 111, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `medlem_has_foresatt`
--

CREATE TABLE `medlem_has_foresatt` (
  `Medlem_MedlemsID` int(11) NOT NULL,
  `Foresatt_ForesattID` int(11) NOT NULL
) 

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `pelotong`
--

CREATE TABLE `pelotong` (
  `idPelotong` int(11) NOT NULL,
  `PelotongTittel` varchar(144) DEFAULT NULL
)

--
-- Dataark for tabell `pelotong`
--

INSERT INTO `pelotong` (`idPelotong`, `PelotongTittel`) VALUES
(1, '1.Pelotong'),
(2, '2.Pelotong');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `rang`
--

CREATE TABLE `rang` (
  `idRang` int(11) NOT NULL,
  `RangTittel` varchar(45) DEFAULT NULL
)

--
-- Dataark for tabell `rang`
--

INSERT INTO `rang` (`idRang`, `RangTittel`) VALUES
(1, 'Soldat'),
(2, 'Offiser'),
(3, 'Slager');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `rettigheter`
--

CREATE TABLE `rettigheter` (
  `idRettigheter` int(11) NOT NULL,
  `Stilling` varchar(145) DEFAULT NULL
)

--
-- Dataark for tabell `rettigheter`
--

INSERT INTO `rettigheter` (`idRettigheter`, `Stilling`) VALUES
(1, 'Gjest'),
(2, 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brukere`
--
ALTER TABLE `brukere`
  ADD PRIMARY KEY (`idBrukere`,`Rettigheter_idRettigheter`),
  ADD UNIQUE KEY `Email_UNIQUE` (`Email`),
  ADD KEY `fk_Brukere_Rettigheter1_idx` (`Rettigheter_idRettigheter`);

--
-- Indexes for table `foresatt`
--
ALTER TABLE `foresatt`
  ADD PRIMARY KEY (`ForesattID`);

--
-- Indexes for table `medlem`
--
ALTER TABLE `medlem`
  ADD PRIMARY KEY (`MedlemsID`,`Rang_idRang`,`Pelotong_idPelotong`),
  ADD KEY `fk_Medlem_Rang1_idx` (`Rang_idRang`),
  ADD KEY `fk_Medlem_Pelotong1_idx` (`Pelotong_idPelotong`);

--
-- Indexes for table `medlem_has_foresatt`
--
ALTER TABLE `medlem_has_foresatt`
  ADD PRIMARY KEY (`Medlem_MedlemsID`,`Foresatt_ForesattID`),
  ADD KEY `fk_Medlem_has_Foresatt_Foresatt1_idx` (`Foresatt_ForesattID`),
  ADD KEY `fk_Medlem_has_Foresatt_Medlem_idx` (`Medlem_MedlemsID`);

--
-- Indexes for table `pelotong`
--
ALTER TABLE `pelotong`
  ADD PRIMARY KEY (`idPelotong`);

--
-- Indexes for table `rang`
--
ALTER TABLE `rang`
  ADD PRIMARY KEY (`idRang`);

--
-- Indexes for table `rettigheter`
--
ALTER TABLE `rettigheter`
  ADD PRIMARY KEY (`idRettigheter`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brukere`
--
ALTER TABLE `brukere`
  MODIFY `idBrukere` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `foresatt`
--
ALTER TABLE `foresatt`
  MODIFY `ForesattID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medlem`
--
ALTER TABLE `medlem`
  MODIFY `MedlemsID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rettigheter`
--
ALTER TABLE `rettigheter`
  MODIFY `idRettigheter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


  

















