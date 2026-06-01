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
('CSM_01', 'Dobozanov Lazar', 'Player', 'Male', 1),
('CSM_02', 'Belenyesi David', 'Player', 'Male', 1),
('CSM_03', 'Negrean Tiberiu', 'Player', 'Male', 1),
('CSM_04', 'Gheorghe Mihnea', 'Player', 'Male', 1),
('CSM_05', 'Oltean Sebastian', 'Player', 'Male', 1),
('CSM_06', 'Ilisie Nichita', 'Player', 'Male', 1),
('CSM_07', 'Luncan Darian', 'Player', 'Male', 1),
('CSM_08', 'Gardasevic Filip', 'Player', 'Male', 1),
('CSM_09', 'Remeș Bogdan', 'Player', 'Male', 1),
('CSM_10', 'Vancsik Levente', 'Player', 'Male', 1),
('CSM_11', 'Czenk Ferencz', 'Player', 'Male', 1),
('CSM_12', 'Velkic Petar', 'Player', 'Male', 1),
('CSM_13', 'Gavriș Raul', 'Player', 'Male', 1),
('CSM_14', 'Bindea Raul', 'Player', 'Male', 1),
('CSM_15', 'Insinna Tomasso', 'Player', 'Male', 1);

INSERT INTO players (player_code, name, position, gender, team_id) VALUES
('STE_01', 'Țic Marius', 'Player', 'Male', 2),
('STE_02', 'Dincă Răducu', 'Player', 'Male', 2),
('STE_03', 'Georgescu Vlad', 'Player', 'Male', 2),
('STE_04', 'Fulea Tudor', 'Player', 'Male', 2),
('STE_05', 'Neamțu Andrei', 'Player', 'Male', 2),
('STE_06', 'Pîrîianu Alin', 'Player', 'Male', 2),
('STE_07', 'Djordje Vucinic', 'Player', 'Male', 2),
('STE_08', 'Antipa Victor', 'Player', 'Male', 2),
('STE_09', 'Colodrovschi Silvian', 'Player', 'Male', 2),
('STE_10', 'Oanță Nicolae', 'Player', 'Male', 2),
('STE_11', 'Iudean Francesco', 'Player', 'Male', 2),
('STE_12', 'Țepeluș Andrei', 'Player', 'Male', 2),
('STE_13', 'Drăgușin Mihai', 'Player', 'Male', 2),
('STE_14', 'Jaukovic Andrija', 'Player', 'Male', 2),
('STE_15', 'Alec Fenec', 'Player', 'Male', 2);

INSERT INTO players (player_code, name, position, gender, team_id) VALUES
('DIN_01', 'Pădureț Mihai', 'Player', 'Male', 3),
('DIN_02', 'Radu Cosmin', 'Player', 'Male', 3),
('DIN_03', 'Cojocariu Tiberiu', 'Player', 'Male', 3),
('DIN_04', 'Prioteasa Andrei', 'Player', 'Male', 3),
('DIN_05', 'Sachetti Riccardo', 'Player', 'Male', 3),
('DIN_06', 'Luțescu Matei', 'Player', 'Male', 3),
('DIN_07', 'Roșan Cristian', 'Player', 'Male', 3),
('DIN_08', 'Marinescu Andrei', 'Player', 'Male', 3),
('DIN_09', 'Giorgi Meskhi', 'Player', 'Male', 3),
('DIN_10', 'Luka Chikovani', 'Player', 'Male', 3),
('DIN_11', 'Ristea Vlad', 'Player', 'Male', 3),
('DIN_12', 'Vrânceanu Ionuț', 'Player', 'Male', 3),
('DIN_13', 'Marchitan Matei', 'Player', 'Male', 3),
('DIN_14', 'Dragomir Filip', 'Player', 'Male', 3),
('DIN_15', 'Popa Cosmin', 'Player', 'Male', 3);

INSERT INTO players (player_code, name, position, gender, team_id) VALUES
('RAP_01', 'Mihăluță Adrian', 'Player', 'Male', 4),
('RAP_02', 'Kovats Viktor', 'Player', 'Male', 4),
('RAP_03', 'Giga Nikola', 'Player', 'Male', 4),
('RAP_04', 'Antun Goreta', 'Player', 'Male', 4),
('RAP_05', 'Rath Răzvan', 'Player', 'Male', 4),
('RAP_06', 'Belu Tudor', 'Player', 'Male', 4),
('RAP_07', 'Dragomirescu Vlad', 'Player', 'Male', 4),
('RAP_08', 'Vrbnjak Ivan', 'Player', 'Male', 4),
('RAP_09', 'Stancu Cosmin', 'Player', 'Male', 4),
('RAP_10', 'Kari Peter', 'Player', 'Male', 4),
('RAP_11', 'Mihai Andrei', 'Player', 'Male', 4),
('RAP_12', 'Sachetti Francesco', 'Player', 'Male', 4),
('RAP_13', 'Buliga Ionuț', 'Player', 'Male', 4),
('RAP_14', 'Baciu Matei', 'Player', 'Male', 4),
('RAP_15', 'Belgiu Radu', 'Player', 'Male', 4);

INSERT INTO players (player_code, name, position, gender, team_id) VALUES
('CLU_01', 'Chindle Rareș', 'Player', 'Male', 5),
('CLU_02', 'Mureșan Daniel', 'Player', 'Male', 5),
('CLU_03', 'Băltean Alexandru', 'Player', 'Male', 5),
('CLU_04', 'Lanevschi Eric', 'Player', 'Male', 5),
('CLU_05', 'Bodea Rareș', 'Player', 'Male', 5),
('CLU_06', 'Tripon Antonio', 'Player', 'Male', 5),
('CLU_07', 'Bodea Victor', 'Player', 'Male', 5),
('CLU_08', 'Patrick Dumitru', 'Player', 'Male', 5),
('CLU_09', 'Palotaș Sergiu', 'Player', 'Male', 5),
('CLU_10', 'Samiulă Mircea', 'Player', 'Male', 5),
('CLU_11', 'Dunca Dragoș', 'Player', 'Male', 5),
('CLU_12', 'Arany Attila', 'Player', 'Male', 5),
('CLU_13', 'Hodăgeu Cătălin', 'Player', 'Male', 5),
('CLU_14', 'Bun Codruț', 'Player', 'Male', 5),
('CLU_15', 'Țîrlea Sebastian', 'Player', 'Male', 5);

INSERT INTO players (player_code, name, position, gender, team_id) VALUES
('SPO_01', 'Zaharia Cătălin', 'Player', 'Male', 6),
('SPO_02', 'Oprea Eduard', 'Player', 'Male', 6),
('SPO_03', 'Dobrescu Mihai', 'Player', 'Male', 6),
('SPO_04', 'Minca Pavel', 'Player', 'Male', 6),
('SPO_05', 'Țiranu Răzvan', 'Player', 'Male', 6),
('SPO_06', 'Stoica Adrian', 'Player', 'Male', 6),
('SPO_07', 'Manciu Patrick', 'Player', 'Male', 6),
('SPO_08', 'Ionescu Andrei', 'Player', 'Male', 6),
('SPO_09', 'Brode Cristian', 'Player', 'Male', 6),
('SPO_10', 'Odeh Mohammed', 'Player', 'Male', 6),
('SPO_11', 'Rotaru Andrei', 'Player', 'Male', 6),
('SPO_12', 'Dervis Eugen', 'Player', 'Male', 6),
('SPO_13', 'Stan Andrei', 'Player', 'Male', 6),
('SPO_14', 'Brînceanu Eduard', 'Player', 'Male', 6),
('SPO_15', 'Cula Andrei', 'Player', 'Male', 6);

INSERT INTO players (player_code, name, position, gender, team_id) VALUES
('TGM_01', 'Șandor Adam', 'Player', 'Male', 7),
('TGM_02', 'Kiss Andrei', 'Player', 'Male', 7),
('TGM_03', 'Maier Darius', 'Player', 'Male', 7),
('TGM_04', 'Kiss Matei', 'Player', 'Male', 7),
('TGM_05', 'Cociș Antonio', 'Player', 'Male', 7),
('TGM_06', 'Grama Tudor', 'Player', 'Male', 7),
('TGM_07', 'Voroneanu Paul', 'Player', 'Male', 7),
('TGM_08', 'Cristian Robert', 'Player', 'Male', 7),
('TGM_09', 'Szathmary Andor', 'Player', 'Male', 7),
('TGM_10', 'Kovacs Mihaly', 'Player', 'Male', 7),
('TGM_11', 'Magyari Botond', 'Player', 'Male', 7),
('TGM_12', 'Dan Ionuț', 'Player', 'Male', 7),
('TGM_13', 'Peti Andraș', 'Player', 'Male', 7),
('TGM_14', 'Kiss Balazs', 'Player', 'Male', 7),
('TGM_15', 'Băilă Luca', 'Player', 'Male', 7);

INSERT INTO players (player_code, name, position, gender, team_id) VALUES
('CSU_01', 'Holhoș Darius', 'Player', 'Male', 8),
('CSU_02', 'Nagy Alexandru', 'Player', 'Male', 8),
('CSU_03', 'Nironca Alexei', 'Player', 'Male', 8),
('CSU_04', 'Rikk David', 'Player', 'Male', 8),
('CSU_05', 'Moca David', 'Player', 'Male', 8),
('CSU_06', 'Soponar Ianis', 'Player', 'Male', 8),
('CSU_07', 'Klunnyi Maksym', 'Player', 'Male', 8),
('CSU_08', 'Tokai Mark', 'Player', 'Male', 8),
('CSU_09', 'Metvai Laszlo', 'Player', 'Male', 8),
('CSU_10', 'Csato Balazs', 'Player', 'Male', 8),
('CSU_11', 'Vușcan Matei', 'Player', 'Male', 8),
('CSU_12', 'Luca Silviu', 'Player', 'Male', 8),
('CSU_13', 'Maximciuc Iilie', 'Player', 'Male', 8),
('CSU_14', 'Cotelnic Dragoș', 'Player', 'Male', 8),
('CSU_15', 'Popescu Andrei', 'Player', 'Male', 8);