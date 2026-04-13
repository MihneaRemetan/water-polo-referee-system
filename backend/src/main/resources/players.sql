DROP TABLE IF EXISTS players;

CREATE TABLE players (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    player_code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(50),
    gender VARCHAR(20),
    team_id BIGINT NOT NULL,
    CONSTRAINT fk_players_team
        FOREIGN KEY (team_id) REFERENCES teams(id)
);

INSERT INTO players (player_code, name, position, gender, team_id) VALUES
('CSM_01', 'Lazar Bogdan', 'Player', 'Male', 1),
('CSM_02', 'David Belenyesi', 'Player', 'Male', 1),
('CSM_03', 'Tibreu Necteam', 'Player', 'Male', 1),
('CSM_04', 'Havene Gheorghe', 'Player', 'Male', 1),
('CSM_05', 'Sebestian Ozean', 'Player', 'Male', 1),
('CSM_06', 'Vincita Ilisie', 'Player', 'Male', 1),
('CSM_07', 'Tomaso Insinna', 'Player', 'Male', 1),
('CSM_08', 'Filip Gardasev', 'Player', 'Male', 1),
('CSM_09', 'Bogdan Mates', 'Player', 'Male', 1),
('CSM_10', 'Levente Vancsik', 'Player', 'Male', 1),
('CSM_11', 'Ferencz Istvan', 'Player', 'Male', 1),
('CSM_12', 'Peter Zoltan', 'Player', 'Male', 1),
('CSM_13', 'Radu Gavris', 'Player', 'Male', 1),
('CSM_14', 'Darian Luncan', 'Player', 'Male', 1),
('CSM_15', 'Raul Bindea', 'Player', 'Male', 1);

INSERT INTO players (player_code, name, position, gender, team_id) VALUES
('STE_01', 'Tic Marius', 'Player', 'Male', 2),
('STE_02', 'Bota David', 'Player', 'Male', 2),
('STE_03', 'Georgescu Vlad', 'Player', 'Male', 2),
('STE_04', 'Fene Acie', 'Player', 'Male', 2),
('STE_05', 'Keanta Andrei', 'Player', 'Male', 2),
('STE_06', 'Piriianu Alin', 'Player', 'Male', 2),
('STE_07', 'Doroianu Dominic', 'Player', 'Male', 2),
('STE_08', 'Amtra Victor', 'Player', 'Male', 2),
('STE_09', 'Codorescu S.', 'Player', 'Male', 2),
('STE_10', 'Oaita Nicolae', 'Player', 'Male', 2),
('STE_11', 'Urecan Francesco', 'Player', 'Male', 2),
('STE_12', 'Tepes Andrei', 'Player', 'Male', 2),
('STE_13', 'Draghus Mihai', 'Player', 'Male', 2),
('STE_14', 'Iancov Andrija', 'Player', 'Male', 2),
('STE_15', 'Dinca Radu', 'Player', 'Male', 2);

INSERT INTO players (player_code, name, position, gender, team_id) VALUES
('DIN_01', 'Pascu M.', 'Player', 'Male', 3),
('DIN_02', 'Rusu C.', 'Player', 'Male', 3),
('DIN_03', 'Cojocaru T.', 'Player', 'Male', 3),
('DIN_04', 'Radu I.', 'Player', 'Male', 3),
('DIN_05', 'Schiopu R.', 'Player', 'Male', 3),
('DIN_06', 'Cojanu C.', 'Player', 'Male', 3),
('DIN_07', 'Rosan C.', 'Player', 'Male', 3),
('DIN_08', 'Ionescu A.', 'Player', 'Male', 3),
('DIN_09', 'Hirscu C.', 'Player', 'Male', 3),
('DIN_10', 'Chirican L.', 'Player', 'Male', 3),
('DIN_11', 'Negos C.', 'Player', 'Male', 3),
('DIN_12', 'Vlahoscu C.', 'Player', 'Male', 3),
('DIN_13', 'Marchitan M.', 'Player', 'Male', 3),
('DIN_14', 'Sahacica E.', 'Player', 'Male', 3),
('DIN_15', 'Popa C.', 'Player', 'Male', 3);

INSERT INTO players (player_code, name, position, gender, team_id) VALUES
('RAP_01', 'Iftimie Adrian', 'Player', 'Male', 4),
('RAP_02', 'Kovats Viktor', 'Player', 'Male', 4),
('RAP_03', 'Gaga Nicolae', 'Player', 'Male', 4),
('RAP_04', 'Gotea Anton', 'Player', 'Male', 4),
('RAP_05', 'Baicu Tudor', 'Player', 'Male', 4),
('RAP_06', 'Bunea Serban', 'Player', 'Male', 4),
('RAP_07', 'Dragomirescu Vlad', 'Player', 'Male', 4),
('RAP_08', 'Skorniak Ivan', 'Player', 'Male', 4),
('RAP_09', 'Brezeanu Miron', 'Player', 'Male', 4),
('RAP_10', 'Stanciu Cosmin', 'Player', 'Male', 4),
('RAP_11', 'Bragau Radu', 'Player', 'Male', 4),
('RAP_12', 'Sarghie Francisc', 'Player', 'Male', 4),
('RAP_13', 'Buliga Ionut', 'Player', 'Male', 4),
('RAP_14', 'Balcu Matei', 'Player', 'Male', 4),
('RAP_15', 'Barbu Narcis', 'Player', 'Male', 4);

INSERT INTO players (player_code, name, position, gender, team_id) VALUES
('CLU_01', 'Chinde Dares', 'Player', 'Male', 5),
('CLU_02', 'Morgan Daniel', 'Player', 'Male', 5),
('CLU_03', 'Băltean Marius', 'Player', 'Male', 5),
('CLU_04', 'Lameșchi Eric', 'Player', 'Male', 5),
('CLU_05', 'Boldt Rareș', 'Player', 'Male', 5),
('CLU_06', 'Iușan Vlad', 'Player', 'Male', 5),
('CLU_07', 'Badea Victor', 'Player', 'Male', 5),
('CLU_08', 'Pandrea Darius', 'Player', 'Male', 5),
('CLU_09', 'Pacan Sebastian', 'Player', 'Male', 5),
('CLU_10', 'Tripon Antonio', 'Player', 'Male', 5),
('CLU_11', 'Donca Darius', 'Player', 'Male', 5),
('CLU_12', 'Arany Attila', 'Player', 'Male', 5),
('CLU_13', 'Horga Catalin', 'Player', 'Male', 5),
('CLU_14', 'Bon Codrut', 'Player', 'Male', 5),
('CLU_15', 'Tirlea Sebastian', 'Player', 'Male', 5);

INSERT INTO players (player_code, name, position, gender, team_id) VALUES
('SPO_01', 'Zaharia Catalin', 'Player', 'Male', 6),
('SPO_02', 'Oprea Eduard', 'Player', 'Male', 6),
('SPO_03', 'Dobrescu Mihai', 'Player', 'Male', 6),
('SPO_04', 'Nimca Pavel', 'Player', 'Male', 6),
('SPO_05', 'Tiranu Razvan', 'Player', 'Male', 6),
('SPO_06', 'Stoica Adrian', 'Player', 'Male', 6),
('SPO_07', 'Tanase Patrick', 'Player', 'Male', 6),
('SPO_08', 'Ionescu Andrei', 'Player', 'Male', 6),
('SPO_09', 'Brode Cristian', 'Player', 'Male', 6),
('SPO_10', 'Oprea Andrei', 'Player', 'Male', 6),
('SPO_11', 'Rotaru Andrei', 'Player', 'Male', 6),
('SPO_12', 'Dervis Eugen', 'Player', 'Male', 6),
('SPO_13', 'Stan Andrei', 'Player', 'Male', 6),
('SPO_14', 'Branceanu Eduard', 'Player', 'Male', 6),
('SPO_15', 'Cula Andrei', 'Player', 'Male', 6);

INSERT INTO players (player_code, name, position, gender, team_id) VALUES
('TGM_01', 'Hudrea Botond', 'Player', 'Male', 7),
('TGM_02', 'Kiss Huba', 'Player', 'Male', 7),
('TGM_03', 'Bode Darius', 'Player', 'Male', 7),
('TGM_04', 'Kiss Mate', 'Player', 'Male', 7),
('TGM_05', 'Lukos Atolmo', 'Player', 'Male', 7),
('TGM_06', 'Farkas Tudor', 'Player', 'Male', 7),
('TGM_07', 'Vicol Tihamer', 'Player', 'Male', 7),
('TGM_08', 'Czonta Robert', 'Player', 'Male', 7),
('TGM_09', 'Szakmary Huba', 'Player', 'Male', 7),
('TGM_10', 'Kovacs Mihaly Zsolt', 'Player', 'Male', 7),
('TGM_11', 'Hegyi Botond', 'Player', 'Male', 7),
('TGM_12', 'Bali Norbi', 'Player', 'Male', 7),
('TGM_13', 'Toth Tiber', 'Player', 'Male', 7),
('TGM_14', 'Gabor Botond', 'Player', 'Male', 7),
('TGM_15', 'Bita Luca', 'Player', 'Male', 7);

INSERT INTO players (player_code, name, position, gender, team_id) VALUES
('CSU_01', 'Holhos Darius', 'Player', 'Male', 8),
('CSU_02', 'Nagy Benjamin', 'Player', 'Male', 8),
('CSU_03', 'Soros Zoltan', 'Player', 'Male', 8),
('CSU_04', 'Pirk David', 'Player', 'Male', 8),
('CSU_05', 'Moca David', 'Player', 'Male', 8),
('CSU_06', 'Scornin Ianc', 'Player', 'Male', 8),
('CSU_07', 'Klunny Maksym', 'Player', 'Male', 8),
('CSU_08', 'Tukai Marko', 'Player', 'Male', 8),
('CSU_09', 'Metari Laszlo', 'Player', 'Male', 8),
('CSU_10', 'Janca Marc', 'Player', 'Male', 8),
('CSU_11', 'Vescan Matei', 'Player', 'Male', 8),
('CSU_12', 'Boros David', 'Player', 'Male', 8),
('CSU_13', 'Kelemen Akos', 'Player', 'Male', 8),
('CSU_14', 'Luca Silviu', 'Player', 'Male', 8),
('CSU_15', 'Cotelinc Marios', 'Player', 'Male', 8);