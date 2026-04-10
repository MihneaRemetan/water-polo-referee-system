DROP TABLE IF EXISTS referee;
CREATE TABLE referee (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    city VARCHAR(100),
    gender VARCHAR(10),
    referee_rank VARCHAR(100),
    password VARCHAR(20)
);

INSERT INTO referee (id, name, city, gender, referee_rank, password) VALUES
-- ARBITRI INTERNAȚIONALI (14)
(1, 'BALANESCU MIHAI', 'BUCURESTI', 'Masculin', 'International', 'REF_01'),
(2, 'MANEA MANUEL', 'BUCURESTI', 'Masculin', 'International', 'REF_02'),
(3, 'MUSTATA ALEXANDRU', 'BUCURESTI', 'Masculin', 'International', 'REF_03'),
(4, 'GEORGESCU PAUL', 'BUCURESTI', 'Masculin', 'International', 'REF_04'),
(5, 'DUMITRACHE TEODOR', 'BUCURESTI', 'Masculin', 'International', 'REF_05'),
(6, 'MATEI GUIMAN ALEXIA', 'BUCURESTI', 'Feminin', 'International', 'REF_06'),
(7, 'TOTH FERENC', 'ORADEA', 'Masculin', 'International', 'REF_07'),
(8, 'ALEXANDRESCU MIHNEA', 'ORADEA', 'Masculin', 'International', 'REF_08'),
(9, 'BAIDOC COSMIN', 'ORADEA', 'Masculin', 'International', 'REF_09'),
(10, 'SZEGHALMI KRISTINA', 'ORADEA', 'Feminin', 'International', 'REF_10'),
(11, 'FEICA-PRODAN IOANA', 'CLUJ NAPOCA', 'Feminin', 'International', 'REF_11'),
(12, 'BROSOVSZKI ATTILA', 'ARAD', 'Masculin', 'International', 'REF_12'),
(13, 'LABONCZ NICOLETA', 'TG. MURES', 'Feminin', 'International', 'REF_13'),
(14, 'SAVA DOMINIC', 'TG. MURES', 'Masculin', 'International', 'REF_14'),

-- ARBITRI NAȚIONALI BUCUREȘTI (31)
(15, 'OPREA DRAGOS', 'BUCURESTI', 'Masculin', 'National (CD)', 'BUC_15'),
(16, 'SERBAN CATICHI GEORGE', 'BUCURESTI', 'Masculin', 'National (CD)', 'BUC_16'),
(17, 'MIHAI COSMIN', 'BUCURESTI', 'Masculin', 'National (CD)', 'BUC_17'),
(18, 'MARINESCU VALJEAN GABRIEL', 'BUCURESTI', 'Masculin', 'National (CD)', 'BUC_18'),
(19, 'RADU MARIUS', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_19'),
(20, 'POPESCU REBECA', 'BUCURESTI', 'Feminin', 'National (CJ)', 'BUC_20'),
(21, 'DEFTA ANDREI MICHAEL', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_21'),
(22, 'CATANA VLAD', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_22'),
(23, 'ANDREI BUNEA', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_23'),
(24, 'STOIAN BOGDAN', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_24'),
(25, 'CHELU ROBERT', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_25'),
(26, 'HABELEA IONUT', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_26'),
(27, 'PORFIREANU ALEXANDRU', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_27'),
(28, 'ANDRA CISMARU', 'BUCURESTI', 'Feminin', 'National (CJ)', 'BUC_28'),
(29, 'ALBU ALEXANDRU', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_29'),
(30, 'GIUCLEA BOGDAN', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_30'),
(31, 'STOIAN ROBERT', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_31'),
(32, 'STOENCIU IONUT', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_32'),
(33, 'GHIBAN ALEXANDRU', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_33'),
(34, 'CISMARU IONUT', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_34'),
(35, 'VRANCEANU CHELSEA', 'BUCURESTI', 'Feminin', 'National (CJ/I)', 'BUC_35'),
(36, 'MELNICIUC ANASTASIA', 'BUCURESTI', 'Feminin', 'National (CJ/I)', 'BUC_36'),
(37, 'NICULAE VALENTIN', 'BUCURESTI', 'Masculin', 'National (S)', 'BUC_37'),
(38, 'BATEN ANDREI', 'BUCURESTI', 'Masculin', 'National (CJ/I)', 'BUC_38'),
(39, 'GOANTA DIMITRI', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_39'),
(40, 'MATEI LUCAS', 'BUCURESTI', 'Masculin', 'National (CJ/I)', 'BUC_40'),
(41, 'BIANCA DUMITRU', 'BUCURESTI', 'Feminin', 'National (CJ/I)', 'BUC_41'),
(42, 'RAUREANU ALEXANDRU', 'BUCURESTI', 'Masculin', 'National (CJ/I)', 'BUC_42'),
(43, 'SANDU ANDRA', 'BUCURESTI', 'Feminin', 'National (CJ/I)', 'BUC_43'),
(44, 'OPREA MARIUS', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_44'),
(45, 'EDWARD MARIUS', 'BUCURESTI', 'Masculin', 'National (CJ)', 'BUC_45'),

-- ORADEA (10)
(46, 'TOTH DIANA', 'ORADEA', 'Feminin', 'National (CJ)', 'ORA_46'),
(47, 'BARBUR TUDOR', 'ORADEA', 'Masculin', 'National (CJ)', 'ORA_47'),
(48, 'TAMAS ANTONIA', 'ORADEA', 'Feminin', 'National (CJ)', 'ORA_48'),
(49, 'HASAS ROLAND', 'ORADEA', 'Masculin', 'National (CJ)', 'ORA_49'),
(50, 'MIRONEA ALEXEI', 'ORADEA', 'Masculin', 'National (CJ)', 'ORA_50'),
(51, 'BIRO DOROTTYA', 'ORADEA', 'Feminin', 'National (CJ/I)', 'ORA_51'),
(52, 'IGNAT PAUL', 'ORADEA', 'Masculin', 'National (CJ/I)', 'ORA_52'),
(53, 'LORINCZ JASMIN', 'ORADEA', 'Feminin', 'National (CJ/I)', 'ORA_53'),
(54, 'GORDAN LORENA', 'ORADEA', 'Feminin', 'National (CJ/I)', 'ORA_54'),
(55, 'RIKH DAVID', 'ORADEA', 'Masculin', 'National (CJ/I)', 'ORA_55'),

-- CLUJ NAPOCA (6)
(56, 'MISCHIAN MIRCEA', 'CLUJ NAPOCA', 'Masculin', 'National (CD)', 'CLU_56'),
(57, 'CIMPOESU VLAD', 'CLUJ NAPOCA', 'Masculin', 'National (CJ)', 'CLU_57'),
(58, 'TODEA TUDOR', 'CLUJ NAPOCA', 'Masculin', 'National (S)', 'CLU_58'),
(59, 'SILAGHI SARA', 'CLUJ NAPOCA', 'Feminin', 'National (CJ/I)', 'CLU_59'),
(60, 'ONIGA BOGDAN', 'CLUJ NAPOCA', 'Masculin', 'National (S)', 'CLU_60'),
(61, 'CALUS DAVID', 'CLUJ NAPOCA', 'Masculin', 'National (S)', 'CLU_61'),

-- TG. MURES (5)
(62, 'SZEGHALMI ANDREA', 'TG. MURES', 'Feminin', 'National (S)', 'MUR_62'),
(63, 'GHERMAN GANA', 'TG. MURES', 'Feminin', 'National (CJ)', 'MUR_63'),
(64, 'MAER ANDREEA', 'TG. MURES', 'Feminin', 'National (CJ)', 'MUR_64'),
(65, 'CAMPEAN ADRIAN', 'TG. MURES', 'Masculin', 'National (CJ)', 'MUR_65'),
(66, 'KOVACS ADRIENN', 'TG. MURES', 'Feminin', 'National (CJ)', 'MUR_66'),

-- ALTE ORAȘE (6)
(67, 'REMETAN MIHNEA', 'ARAD', 'Masculin', 'National (STO)', 'ARA_67'),
(68, 'SOFRONICIU COSMIN', 'ARAD', 'Masculin', 'National (CJ)', 'ARA_68'),
(69, 'IACOB DIANA MARIA', 'ALBA IULIA', 'Feminin', 'National (CJ)', 'ALB_69'),
(70, 'PETER SZABOLCS', 'BRASOV', 'Masculin', 'National (CJ)', 'BRA_70'),
(71, 'LAZAR VIOREL', 'FOCSANI', 'Masculin', 'National (CJ/I)', 'FOC_71'),
(72, 'LAZAR MIRELA', 'FOCSANI', 'Feminin', 'National (CJ/I)', 'FOC_72');

INSERT INTO referee (id, name, city, gender, referee_rank, password) VALUES
(100, 'TEST USER', 'BUCURESTI', 'Masculin', 'Admin/Test', 'Frp_2026_Secure_9X!');

DROP TABLE IF EXISTS observer;
CREATE TABLE observer (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    city VARCHAR(100),
    gender VARCHAR(10),
    observer_rank VARCHAR(100),
    password VARCHAR(50)
);

INSERT INTO observer (id, name, city, gender, observer_rank, password) VALUES
(201, 'BOGDAN COJOCARIU', 'BUCURESTI', 'Masculin', 'Presedinte', 'OBS_201'),
(202, 'SERBAN MEDIAN', 'BUCURESTI', 'Masculin', 'Membru', 'OBS_202'),
(203, 'EUGEN IONESCU', 'BUCURESTI', 'Masculin', 'Membru', 'OBS_203'),
(204, 'FLORIAN DUMITRACHE', 'BUCURESTI', 'Masculin', 'Membru', 'OBS_204'),
(205, 'RAZVAN IONESCU', 'ARAD', 'Masculin', 'Membru', 'OBS_205'),
(206, 'NICOLAE DIACONU', 'BUCURESTI', 'Masculin', 'Membru', 'OBS_206'),
(207, 'RADU MATACHE', 'BUCURESTI', 'Masculin', 'Membru', 'OBS_207');

INSERT INTO teams (name, short_name, city) VALUES
('CSM Oradea', 'ORA', 'Oradea'),
('Steaua Bucuresti', 'STE', 'Bucuresti'),
('Dinamo Bucuresti', 'DIN', 'Bucuresti'),
('Rapid Bucuresti', 'RAP', 'Bucuresti'),
('Politehnica Cluj', 'CLU', 'Cluj-Napoca');