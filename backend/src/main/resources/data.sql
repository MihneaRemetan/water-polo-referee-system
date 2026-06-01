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
(1, 'BALANESCU MIHAI', 'BUCUREȘTI', 'Masculin', 'Internațional', 'REF_01'),
(2, 'MANEA MANUEL', 'BUCUREȘTI', 'Masculin', 'Internațional', 'REF_02'),
(3, 'MUSTATA ALEXANDRU', 'BUCUREȘTI', 'Masculin', 'Internațional', 'REF_03'),
(4, 'GEORGESCU PAUL', 'BUCUREȘTI', 'Masculin', 'Internațional', 'REF_04'),
(5, 'DUMITRACHE TEODOR', 'BUCUREȘTI', 'Masculin', 'Internațional', 'REF_05'),
(6, 'MATEI GUIMAN ALEXIA', 'BUCUREȘTI', 'Feminin', 'Internațional', 'REF_06'),
(7, 'TOTH FERENC', 'ORADEA', 'Masculin', 'Internațional', 'REF_07'),
(8, 'ALEXANDRESCU MIHNEA', 'ORADEA', 'Masculin', 'Internațional', 'REF_08'),
(9, 'BAIDOC COSMIN', 'ORADEA', 'Masculin', 'Internațional', 'REF_09'),
(10, 'SZEGHALMI KRISTINA', 'ORADEA', 'Feminin', 'Internațional', 'REF_10'),
(11, 'FEICA-PRODAN IOANA', 'CLUJ NAPOCA', 'Feminin', 'Internațional', 'REF_11'),
(12, 'BROSOVSZKI ATTILA', 'ARAD', 'Masculin', 'Internațional', 'REF_12'),
(13, 'LABONCZ NICOLETA', 'TG. MURES', 'Feminin', 'Internațional', 'REF_13'),
(14, 'SAVA DOMINIC', 'TG. MURES', 'Masculin', 'Internațional', 'REF_14'),

-- ARBITRI NAȚIONALI BUCUREȘTI (31)
(15, 'OPREA DRAGOS', 'BUCUREȘTI', 'Masculin', 'Național (CD)', 'BUC_15'),
(16, 'SERBAN CATICHI GEORGE', 'BUCUREȘTI', 'Masculin', 'Național (CD)', 'BUC_16'),
(17, 'MIHAI COSMIN', 'BUCUREȘTI', 'Masculin', 'Național (CD)', 'BUC_17'),
(18, 'MARINESCU VALJEAN GABRIEL', 'BUCUREȘTI', 'Masculin', 'Național (CD)', 'BUC_18'),
(19, 'RADU MARIUS', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_19'),
(20, 'POPESCU REBECA', 'BUCUREȘTI', 'Feminin', 'Național (CJ)', 'BUC_20'),
(21, 'DEFTA ANDREI MICHAEL', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_21'),
(22, 'CATANA VLAD', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_22'),
(23, 'ANDREI BUNEA', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_23'),
(24, 'STOIAN BOGDAN', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_24'),
(25, 'CHELU ROBERT', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_25'),
(26, 'HABELEA IONUT', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_26'),
(27, 'PORFIREANU ALEXANDRU', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_27'),
(28, 'ANDRA CISMARU', 'BUCUREȘTI', 'Feminin', 'Național (CJ)', 'BUC_28'),
(29, 'ALBU ALEXANDRU', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_29'),
(30, 'GIUCLEA BOGDAN', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_30'),
(31, 'STOIAN ROBERT', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_31'),
(32, 'STOENCIU IONUT', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_32'),
(33, 'GHIBAN ALEXANDRU', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_33'),
(34, 'CISMARU IONUT', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_34'),
(35, 'VRANCEANU CHELSEA', 'BUCUREȘTI', 'Feminin', 'Național (CJ/I)', 'BUC_35'),
(36, 'MELNICIUC ANASTASIA', 'BUCUREȘTI', 'Feminin', 'Național (CJ/I)', 'BUC_36'),
(37, 'NICULAE VALENTIN', 'BUCUREȘTI', 'Masculin', 'Național (S)', 'BUC_37'),
(38, 'BATEN ANDREI', 'BUCUREȘTI', 'Masculin', 'Național (CJ/I)', 'BUC_38'),
(39, 'GOANTA DIMITRI', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_39'),
(40, 'MATEI LUCAS', 'BUCUREȘTI', 'Masculin', 'Național (CJ/I)', 'BUC_40'),
(41, 'BIANCA DUMITRU', 'BUCUREȘTI', 'Feminin', 'Național (CJ/I)', 'BUC_41'),
(42, 'RAUREANU ALEXANDRU', 'BUCUREȘTI', 'Masculin', 'Național (CJ/I)', 'BUC_42'),
(43, 'SANDU ANDRA', 'BUCUREȘTI', 'Feminin', 'Național (CJ/I)', 'BUC_43'),
(44, 'OPREA MARIUS', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_44'),
(45, 'EDWARD MARIUS', 'BUCUREȘTI', 'Masculin', 'Național (CJ)', 'BUC_45'),

-- ORADEA (10)
(46, 'TOTH DIANA', 'ORADEA', 'Feminin', 'Național (CJ)', 'ORA_46'),
(47, 'BARBUR TUDOR', 'ORADEA', 'Masculin', 'Național (CJ)', 'ORA_47'),
(48, 'TAMAS ANTONIA', 'ORADEA', 'Feminin', 'Național (CJ)', 'ORA_48'),
(49, 'HASAS ROLAND', 'ORADEA', 'Masculin', 'Național (CJ)', 'ORA_49'),
(50, 'MIRONEA ALEXEI', 'ORADEA', 'Masculin', 'Național (CJ)', 'ORA_50'),
(51, 'BIRO DOROTTYA', 'ORADEA', 'Feminin', 'Național (CJ/I)', 'ORA_51'),
(52, 'IGNAT PAUL', 'ORADEA', 'Masculin', 'Național (CJ/I)', 'ORA_52'),
(53, 'LORINCZ JASMIN', 'ORADEA', 'Feminin', 'Național (CJ/I)', 'ORA_53'),
(54, 'GORDAN LORENA', 'ORADEA', 'Feminin', 'Național (CJ/I)', 'ORA_54'),
(55, 'RIKH DAVID', 'ORADEA', 'Masculin', 'Național (CJ/I)', 'ORA_55'),

-- CLUJ NAPOCA (6)
(56, 'MISCHIAN MIRCEA', 'CLUJ NAPOCA', 'Masculin', 'Național (CD)', 'CLU_56'),
(57, 'CIMPOESU VLAD', 'CLUJ NAPOCA', 'Masculin', 'Național (CJ)', 'CLU_57'),
(58, 'TODEA TUDOR', 'CLUJ NAPOCA', 'Masculin', 'Național (S)', 'CLU_58'),
(59, 'SILAGHI SARA', 'CLUJ NAPOCA', 'Feminin', 'Național (CJ/I)', 'CLU_59'),
(60, 'ONIGA BOGDAN', 'CLUJ NAPOCA', 'Masculin', 'Național (S)', 'CLU_60'),
(61, 'CALUS DAVID', 'CLUJ NAPOCA', 'Masculin', 'Național (S)', 'CLU_61'),

-- TG. MURES (5)
(62, 'SZEGHALMI ANDREA', 'TG. MURES', 'Feminin', 'Național (S)', 'MUR_62'),
(63, 'GHERMAN GANA', 'TG. MURES', 'Feminin', 'Național (CJ)', 'MUR_63'),
(64, 'MAER ANDREEA', 'TG. MURES', 'Feminin', 'Național (CJ)', 'MUR_64'),
(65, 'CAMPEAN ADRIAN', 'TG. MURES', 'Masculin', 'Național (CJ)', 'MUR_65'),
(66, 'KOVACS ADRIENN', 'TG. MURES', 'Feminin', 'Național (CJ)', 'MUR_66'),

-- ALTE ORAȘE (6)
(67, 'REMETAN MIHNEA', 'ARAD', 'Masculin', 'Național (STO)', 'ARA_67'),
(68, 'SOFRONICIU COSMIN', 'ARAD', 'Masculin', 'Național (CJ)', 'ARA_68'),
(69, 'IACOB DIANA MARIA', 'ALBA IULIA', 'Feminin', 'Național (CJ)', 'ALB_69'),
(70, 'PETER SZABOLCS', 'BRAȘOV', 'Masculin', 'Național (CJ)', 'BRA_70'),
(71, 'LAZAR VIOREL', 'FOCȘANI', 'Masculin', 'Național (CJ/I)', 'FOC_71'),
(72, 'LAZAR MIRELA', 'FOCȘANI', 'Feminin', 'Național (CJ/I)', 'FOC_72');

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
(201, 'BOGDAN COJOCARIU', 'BUCUREȘTI', 'Masculin', 'Presedinte', 'OBS_201'),
(202, 'SERBAN MEDIAN', 'BUCUREȘTI', 'Masculin', 'Membru', 'OBS_202'),
(203, 'EUGEN IONESCU', 'BUCUREȘTI', 'Masculin', 'Membru', 'OBS_203'),
(204, 'FLORIAN DUMITRACHE', 'BUCUREȘTI', 'Masculin', 'Membru', 'OBS_204'),
(205, 'RAZVAN IONESCU', 'ARAD', 'Masculin', 'Membru', 'OBS_205'),
(206, 'NICOLAE DIACONU', 'BUCUREȘTI', 'Masculin', 'Membru', 'OBS_206'),
(207, 'RADU MATACHE', 'BUCUREȘTI', 'Masculin', 'Membru', 'OBS_207');