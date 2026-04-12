DROP TABLE IF EXISTS players;

CREATE TABLE players (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    player_code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    number INT NOT NULL,
    position VARCHAR(50),
    gender VARCHAR(20),
    team_id BIGINT NOT NULL,
    CONSTRAINT fk_players_team
        FOREIGN KEY (team_id) REFERENCES teams(id)
);

INSERT INTO players (player_code, name, number, position, gender, team_id) VALUES
('CSM_01', 'Lazar Bogdan', 1, 'Player', 'Male', 1),
('CSM_02', 'David Belenyesi', 2, 'Player', 'Male', 1),
('CSM_03', 'Tibreu Necteam', 3, 'Player', 'Male', 1),
('CSM_04', 'Havene Gheorghe', 4, 'Player', 'Male', 1),
('CSM_05', 'Sebestian Ozean', 5, 'Player', 'Male', 1),
('CSM_06', 'Vincita Ilisie', 6, 'Player', 'Male', 1),
('CSM_07', 'Tomaso Insinna', 7, 'Player', 'Male', 1),
('CSM_08', 'Filip Gardasev', 8, 'Player', 'Male', 1),
('CSM_09', 'Bogdan Mates', 9, 'Player', 'Male', 1),
('CSM_10', 'Levente Vancsik', 10, 'Player', 'Male', 1),
('CSM_11', 'Ferencz Istvan', 11, 'Player', 'Male', 1),
('CSM_12', 'Peter Zoltan', 12, 'Player', 'Male', 1),
('CSM_13', 'Radu Gavris', 13, 'Player', 'Male', 1),
('CSM_14', 'Darian Luncan', 14, 'Player', 'Male', 1),
('CSM_15', 'Raul Bindea', 15, 'Player', 'Male', 1);

INSERT INTO players (player_code, name, number, position, gender, team_id) VALUES
('STE_01', 'Tic Marius', 1, 'Player', 'Male', 2),
('STE_02', 'Bota David', 2, 'Player', 'Male', 2),
('STE_03', 'Georgescu Vlad', 3, 'Player', 'Male', 2),
('STE_04', 'Fene Acie', 4, 'Player', 'Male', 2),
('STE_05', 'Keanta Andrei', 5, 'Player', 'Male', 2),
('STE_06', 'Piriianu Alin', 6, 'Player', 'Male', 2),
('STE_07', 'Doroianu Dominic', 7, 'Player', 'Male', 2),
('STE_08', 'Amtra Victor', 8, 'Player', 'Male', 2),
('STE_09', 'Codorescu S.', 9, 'Player', 'Male', 2),
('STE_10', 'Oaita Nicolae', 10, 'Player', 'Male', 2),
('STE_11', 'Urecan Francesco', 11, 'Player', 'Male', 2),
('STE_12', 'Tepes Andrei', 12, 'Player', 'Male', 2),
('STE_13', 'Draghus Mihai', 13, 'Player', 'Male', 2),
('STE_14', 'Iancov Andrija', 14, 'Player', 'Male', 2),
('STE_15', 'Dinca Radu', 15, 'Player', 'Male', 2);

INSERT INTO players (player_code, name, number, position, gender, team_id) VALUES
('DIN_01', 'Pascu M.', 1, 'Player', 'Male', 3),
('DIN_02', 'Rusu C.', 2, 'Player', 'Male', 3),
('DIN_03', 'Cojocaru T.', 3, 'Player', 'Male', 3),
('DIN_04', 'Radu I.', 4, 'Player', 'Male', 3),
('DIN_05', 'Schiopu R.', 5, 'Player', 'Male', 3),
('DIN_06', 'Cojanu C.', 6, 'Player', 'Male', 3),
('DIN_07', 'Rosan C.', 7, 'Player', 'Male', 3),
('DIN_08', 'Ionescu A.', 8, 'Player', 'Male', 3),
('DIN_09', 'Hirscu C.', 9, 'Player', 'Male', 3),
('DIN_10', 'Chirican L.', 10, 'Player', 'Male', 3),
('DIN_11', 'Negos C.', 11, 'Player', 'Male', 3),
('DIN_12', 'Vlahoscu C.', 12, 'Player', 'Male', 3),
('DIN_13', 'Marchitan M.', 13, 'Player', 'Male', 3),
('DIN_14', 'Sahacica E.', 14, 'Player', 'Male', 3),
('DIN_15', 'Popa C.', 15, 'Player', 'Male', 3);

INSERT INTO players (player_code, name, number, position, gender, team_id) VALUES
('RAP_01', 'Iftimie Adrian', 1, 'Player', 'Male', 4),
('RAP_02', 'Kovats Viktor', 2, 'Player', 'Male', 4),
('RAP_03', 'Gaga Nicolae', 3, 'Player', 'Male', 4),
('RAP_04', 'Gotea Anton', 4, 'Player', 'Male', 4),
('RAP_05', 'Baicu Tudor', 5, 'Player', 'Male', 4),
('RAP_06', 'Bunea Serban', 6, 'Player', 'Male', 4),
('RAP_07', 'Dragomirescu Vlad', 7, 'Player', 'Male', 4),
('RAP_08', 'Skorniak Ivan', 8, 'Player', 'Male', 4),
('RAP_09', 'Brezeanu Miron', 9, 'Player', 'Male', 4),
('RAP_10', 'Stanciu Cosmin', 10, 'Player', 'Male', 4),
('RAP_11', 'Bragau Radu', 11, 'Player', 'Male', 4),
('RAP_12', 'Sarghie Francisc', 12, 'Player', 'Male', 4),
('RAP_13', 'Buliga Ionut', 13, 'Player', 'Male', 4),
('RAP_14', 'Balcu Matei', 14, 'Player', 'Male', 4),
('RAP_15', 'Barbu Narcis', 15, 'Player', 'Male', 4);

INSERT INTO players (player_code, name, number, position, gender, team_id) VALUES
('CLU_01', 'Chinde Dares', 1, 'Player', 'Male', 5),
('CLU_02', 'Morgan Daniel', 2, 'Player', 'Male', 5),
('CLU_03', 'Băltean Marius', 3, 'Player', 'Male', 5),
('CLU_04', 'Lameșchi Eric', 4, 'Player', 'Male', 5),
('CLU_05', 'Boldt Rareș', 5, 'Player', 'Male', 5),
('CLU_06', 'Iușan Vlad', 6, 'Player', 'Male', 5),
('CLU_07', 'Badea Victor', 7, 'Player', 'Male', 5),
('CLU_08', 'Pandrea Darius', 8, 'Player', 'Male', 5),
('CLU_09', 'Pacan Sebastian', 9, 'Player', 'Male', 5),
('CLU_10', 'Tripon Antonio', 10, 'Player', 'Male', 5),
('CLU_11', 'Donca Darius', 11, 'Player', 'Male', 5),
('CLU_12', 'Arany Attila', 12, 'Player', 'Male', 5),
('CLU_13', 'Horga Catalin', 13, 'Player', 'Male', 5),
('CLU_14', 'Bon Codrut', 14, 'Player', 'Male', 5),
('CLU_15', 'Tirlea Sebastian', 15, 'Player', 'Male', 5);

INSERT INTO players (player_code, name, number, position, gender, team_id) VALUES
('SPO_01', 'Zaharia Catalin', 1, 'Player', 'Male', 6),
('SPO_02', 'Oprea Eduard', 2, 'Player', 'Male', 6),
('SPO_03', 'Dobrescu Mihai', 3, 'Player', 'Male', 6),
('SPO_04', 'Nimca Pavel', 4, 'Player', 'Male', 6),
('SPO_05', 'Tiranu Razvan', 5, 'Player', 'Male', 6),
('SPO_06', 'Stoica Adrian', 6, 'Player', 'Male', 6),
('SPO_07', 'Tanase Patrick', 7, 'Player', 'Male', 6),
('SPO_08', 'Ionescu Andrei', 8, 'Player', 'Male', 6),
('SPO_09', 'Brode Cristian', 9, 'Player', 'Male', 6),
('SPO_10', 'Oprea Andrei', 10, 'Player', 'Male', 6),
('SPO_11', 'Rotaru Andrei', 11, 'Player', 'Male', 6),
('SPO_12', 'Dervis Eugen', 12, 'Player', 'Male', 6),
('SPO_13', 'Stan Andrei', 13, 'Player', 'Male', 6),
('SPO_14', 'Branceanu Eduard', 14, 'Player', 'Male', 6),
('SPO_15', 'Cula Andrei', 15, 'Player', 'Male', 6);

INSERT INTO players (player_code, name, number, position, gender, team_id) VALUES
('TGM_01', 'Hudrea Botond', 1, 'Player', 'Male', 7),
('TGM_02', 'Kiss Huba', 2, 'Player', 'Male', 7),
('TGM_03', 'Bode Darius', 3, 'Player', 'Male', 7),
('TGM_04', 'Kiss Mate', 4, 'Player', 'Male', 7),
('TGM_05', 'Lukos Atolmo', 5, 'Player', 'Male', 7),
('TGM_06', 'Farkas Tudor', 6, 'Player', 'Male', 7),
('TGM_07', 'Vicol Tihamer', 7, 'Player', 'Male', 7),
('TGM_08', 'Czonta Robert', 8, 'Player', 'Male', 7),
('TGM_09', 'Szakmary Huba', 9, 'Player', 'Male', 7),
('TGM_10', 'Kovacs Mihaly Zsolt', 10, 'Player', 'Male', 7),
('TGM_11', 'Hegyi Botond', 11, 'Player', 'Male', 7),
('TGM_12', 'Bali Norbi', 12, 'Player', 'Male', 7),
('TGM_13', 'Toth Tiber', 13, 'Player', 'Male', 7),
('TGM_14', 'Gabor Botond', 14, 'Player', 'Male', 7),
('TGM_15', 'Bita Luca', 15, 'Player', 'Male', 7);

INSERT INTO players (player_code, name, number, position, gender, team_id) VALUES
('CSU_01', 'Holhos Darius', 1, 'Player', 'Male', 8),
('CSU_02', 'Nagy Benjamin', 2, 'Player', 'Male', 8),
('CSU_03', 'Soros Zoltan', 3, 'Player', 'Male', 8),
('CSU_04', 'Pirk David', 4, 'Player', 'Male', 8),
('CSU_05', 'Moca David', 5, 'Player', 'Male', 8),
('CSU_06', 'Scornin Ianc', 6, 'Player', 'Male', 8),
('CSU_07', 'Klunny Maksym', 7, 'Player', 'Male', 8),
('CSU_08', 'Tukai Marko', 8, 'Player', 'Male', 8),
('CSU_09', 'Metari Laszlo', 9, 'Player', 'Male', 8),
('CSU_10', 'Janca Marc', 10, 'Player', 'Male', 8),
('CSU_11', 'Vescan Matei', 11, 'Player', 'Male', 8),
('CSU_12', 'Boros David', 12, 'Player', 'Male', 8),
('CSU_13', 'Kelemen Akos', 13, 'Player', 'Male', 8),
('CSU_14', 'Luca Silviu', 14, 'Player', 'Male', 8),
('CSU_15', 'Cotelinc Marios', 15, 'Player', 'Male', 8);