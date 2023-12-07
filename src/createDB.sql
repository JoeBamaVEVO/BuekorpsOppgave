CREATE TABLE IF NOT EXISTS `brukere` (
  `idBrukere` INTEGER PRIMARY KEY AUTOINCREMENT,
  `Brukernavn` TEXT,
  `Email` TEXT,
  `Passord` TEXT,
  `isAdmin` INTEGER DEFAULT 0,
  `Rettigheter_idRettigheter` INTEGER NOT NULL DEFAULT 1,
  CONSTRAINT `fk_Brukere_Rettigheter1` FOREIGN KEY (`Rettigheter_idRettigheter`) REFERENCES `rettigheter` (`idRettigheter`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT INTO `brukere` (`idBrukere`, `Brukernavn`, `Email`, `Passord`, `isAdmin`, `Rettigheter_idRettigheter`) VALUES
(3, 'Admin', 'admin@placeholder.com', '$2b$10$Km/NuYapEvXIb4OP9UyLeu3U.iUF8IKMJ5wo1HF7mmAMI.bWjogSS', 1, 2);

CREATE TABLE IF NOT EXISTS `foresatt` (
  `ForesattID` INTEGER PRIMARY KEY AUTOINCREMENT,
  `Fornavn` TEXT,
  `Etternavn` TEXT,
  `Telefon` INTEGER
);

CREATE TABLE IF NOT EXISTS `medlem` (
  `MedlemsID` INTEGER PRIMARY KEY AUTOINCREMENT,
  `Fornavn` TEXT,
  `Etternavn` TEXT,
  `Alder` INTEGER,
  `Adresse` TEXT,
  `Postnummer` INTEGER,
  `Postadresse` TEXT,
  `Tlf` INTEGER,
  `AntallAarSomMedlem` INTEGER,
  `Rang_idRang` INTEGER NOT NULL,
  `Pelotong_idPelotong` INTEGER NOT NULL,
  CONSTRAINT `fk_Medlem_Pelotong1` FOREIGN KEY (`Pelotong_idPelotong`) REFERENCES `pelotong` (`idPelotong`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Medlem_Rang1` FOREIGN KEY (`Rang_idRang`) REFERENCES `rang` (`idRang`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT INTO `medlem` (`MedlemsID`, `Fornavn`, `Etternavn`, `Alder`, `Adresse`, `Postnummer`, `Postadresse`, `Tlf`, `AntallAarSomMedlem`, `Rang_idRang`, `Pelotong_idPelotong`) VALUES
(2, 'k', 'k', 1, 'k', 1, 'k', 111, NULL, 2, 1),
(3, 'kd', 'd', 12, 'kk', 22, 'kkkk', 111, NULL, 1, 1);

CREATE TABLE IF NOT EXISTS `medlem_has_foresatt` (
  `Medlem_MedlemsID` INTEGER NOT NULL,
  `Foresatt_ForesattID` INTEGER NOT NULL,
  CONSTRAINT `fk_Medlem_has_Foresatt_Foresatt1` FOREIGN KEY (`Foresatt_ForesattID`) REFERENCES `foresatt` (`ForesattID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Medlem_has_Foresatt_Medlem` FOREIGN KEY (`Medlem_MedlemsID`) REFERENCES `medlem` (`MedlemsID`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `pelotong` (
  `idPelotong` INTEGER PRIMARY KEY AUTOINCREMENT,
  `PelotongTittel` TEXT
);

INSERT INTO `pelotong` (`idPelotong`, `PelotongTittel`) VALUES
(1, '1.Pelotong'),
(2, '2.Pelotong');

CREATE TABLE IF NOT EXISTS `rang` (
  `idRang` INTEGER PRIMARY KEY AUTOINCREMENT,
  `RangTittel` TEXT
);

INSERT INTO `rang` (`idRang`, `RangTittel`) VALUES
(1, 'Soldat'),
(2, 'Offiser'),
(3, 'Slager');

CREATE TABLE IF NOT EXISTS `rettigheter` (
  `idRettigheter` INTEGER PRIMARY KEY AUTOINCREMENT,
  `Stilling` TEXT
);

INSERT INTO `rettigheter` (`idRettigheter`, `Stilling`) VALUES
(1, 'Gjest'),
(2, 'Admin');

-- ALTER TABLE `brukere`
--   ADD CONSTRAINT `fk_Brukere_Rettigheter1` FOREIGN KEY (`Rettigheter_idRettigheter`) REFERENCES `rettigheter` (`idRettigheter`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ALTER TABLE `medlem`
--   ADD CONSTRAINT `fk_Medlem_Pelotong1` FOREIGN KEY (`Pelotong_idPelotong`) REFERENCES `pelotong` (`idPelotong`) ON DELETE NO ACTION ON UPDATE NO ACTION,
--   ADD CONSTRAINT `fk_Medlem_Rang1` FOREIGN KEY (`Rang_idRang`) REFERENCES `rang` (`idRang`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ALTER TABLE `medlem_has_foresatt`
--   ADD CONSTRAINT `fk_Medlem_has_Foresatt_Foresatt1` FOREIGN KEY (`Foresatt_ForesattID`) REFERENCES `foresatt` (`ForesattID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
--   ADD CONSTRAINT `fk_Medlem_has_Foresatt_Medlem` FOREIGN KEY (`Medlem_MedlemsID`) REFERENCES `medlem` (`MedlemsID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
