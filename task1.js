
function onlyDigits(numberSystem)
{
	// Устанавливаем флаг использования исходной системой счисления символов, отличных от цифр
	if (numberSystem < 11)
		// Используются только цифры
		return 1;
	else
		// Используются цифры и буквенные символы
		return 0;
}

/** Находит код буквенного символа, используемого в качестве наибольшей цифры в указанной системе счисления
* @param vF система счисления
* @return код буквенного символа, используемого в качестве наибольшей цифры в указанной системе счисления */
function maxSymbol(vF)
{
	if (vF < 11)
		return 47 + vF;
	else
		return 86 + vF;
}

/** Проверяет ввод данных 
* @param iV число, переводимое из одной системы счисления в другую
* @param fV система счисления переданного числа
* @param bV система счисления, в которую необходимо перевести число
* @return 0, если нет ошибок, либо текст ошибки */
function wrongArgs(iV, fV, bV)
{
	/* Проверяем число i */
	if (iV.length > 5)
		return 'Недопустимое число';
	else
		if ((iV.length === 5) && (iV !== '10000'))
			return 'Недопустимое число';
	/* Проверяем основание системы счисления */
	// если введено не число
	if ((isNaN(fV)) || (isNaN(bV)))
		return 'Недопустимое основание системы счисления';
	// иначе представляем аргументы командной строки в виде чисел
	else
	{
		fV = parseInt(fV);
		bV = parseInt(bV);
	}
	// если основание системы недопустимое
	if ((fV < 2) || (fV > 36) || (bV < 2) || (bV > 36))
		return 'Недопустимое основание системы счисления';

	/* Проверяем символы введенного числа */
	// Находим код буквенного символа, используемого в качестве наибольшей цифры в указанной системе счисления
	const max = maxSymbol(fV);
	// Переменная для хранения проверяемого символа числа
	let nextSymbol;
	// Если система счисления использует в качестве символов только цифры
	if (onlyDigits(fV) === 1)
	{
		for (let count = 0; count < iV.length; count++)
		{
			nextSymbol = iV.charCodeAt(count);			
			if ((nextSymbol < 48) || (nextSymbol > max))
				return 'Недопустимый символ в числе';
		}
	}
	// иначе система счисления использует буквенные символы
	else
	{
		iV = iV.toLowerCase();
		for (let count = 0; count < iV.length; count++)
		{
			nextSymbol = iV.charCodeAt(count);
			// цифры имеют коды от 48 до 57, маленькие буквы имеют коды от 97 до 122
			if ((nextSymbol < 48) || ((nextSymbol > 57) && (nextSymbol < 97)) || (nextSymbol > (max + 32)))
				return 'Недопустимый символ в числе';
		}
	}
	// Ошибки ввода отсутствуют
	return 0;
}

/** Возвращает число в десятичной системе счисления
* @param iVal значение, для которого определяется число в десятичной системе счисления
* @return число в десятичной системе счисления, соответствующее переданному значению */
function parseToSystem10(iVal)
{
	// Если передан символ
	if (isNaN(iVal))
	{
		/* то преобразуем его в число десятичной системы счисления */
		// получаем код символа
		const symbolCode = iVal.toLowerCase().charCodeAt(0);
		// возвращаем число десятичной системы, соответствующее символу
		return symbolCode - 87;
	}
	// иначе передано число
	return parseInt(iVal);
}

/** Переводит число из одной системы счисления в другую и возвращает его в новой системе счисления
* @param numberForConvert конвертирумое число
* @param fromSystem исходная система счисления
* @param toSystem требуемая система счисления
* @return число в новой системе счисления */
function convertNumber(numberForConvert, fromSystem, toSystem)
{
	/* Проверяем корректность введенных данных */
	/* Отключена проверка входных параметров
	const checkArguments = wrongArgs(numberForConvert, fromSystem, toSystem);
	// Если введены некоректные данные
	if (checkArguments !== 0)
	{
		// Выводим ошибку
		process.stdout.write(checkArguments);
	}
	// иначе введенные данные корректны
	else
	{*/
		/* Представляем аргументы командной строки в виде чисел */
		fromSystem = parseInt(fromSystem);
		toSystem = parseInt(toSystem);
		// Если системы счисления совпадают
		if (fromSystem === toSystem)
		{
			// то выводим тоже самое число
			process.stdout.write(numberForConvert);
		}
		// иначе осуществляем перевод в другую систему счисления
		else
		{
			// Переменная для хранения числа в десятичной системе счисления
			let numberInSystem10 = 0;
			// Переменная для хранения числа в новой системе счисления
			let numberInNewSystem = '';
			// Переменная для хранения целой части числа
			let integerPartOfNumber;
			// Переменная для хранения символов всех цифр 36-ричной системы счисления
			const symbolsArray = '0123456789abcdefghijklmnopqrstuvwxyz';

			// Число задано в системе счисления, использующей в качестве символов только цифры
			if (fromSystem < 10)
			{
				for (let count = 0; count < numberForConvert.length; count++)
				{
					// Умножаем каждую цифру исходного числа на число, равное основанию исходной системы счисления в степени,
					// равной уменьшенному на 1 номеру разряда, в котором находится цифра
					numberInSystem10 += parseInt(numberForConvert[count])*(Math.pow(fromSystem,(numberForConvert.length - count - 1)));
				}
			}
			else
				// Число задано в системе счисления, использующей в качестве символов буквы
				if (fromSystem !== 10)
				{
					for (let count = 0; count < numberForConvert.length; count++)
					{
						// Умножаем каждый символ исходного числа на число, равное основанию исходной системы счисления в степени,
						// равной уменьшенному на 1 номеру разряда, в котором находится символ
						numberInSystem10 += parseToSystem10(numberForConvert[count])*(Math.pow(fromSystem,(numberForConvert.length - count - 1)));
					}
				}
				// Иначе исходная система счисления является десятичной
				else
				{
					numberInSystem10 = parseInt(numberForConvert);
				}	

			// если переводим в систему, отличную от десятичной
			if (toSystem !== 10)
			{
				// Определяем символы, представляющие число i в системах счисления с основанием от 2 до 36
				do
				{
					// Находим символ, соответствующий остатку от деления числа i на основание новой системы счисления
					integerPartOfNumber = symbolsArray[numberInSystem10 % toSystem];
					// Добавляем найденный символ
					numberInNewSystem = integerPartOfNumber + numberInNewSystem;
					// Находим целую часть от деления числа i на основание новой системы счисления
					numberInSystem10 = Math.floor(numberInSystem10 / toSystem);			
				}
				while (numberInSystem10 !== 0);
			}
			// иначе перевод уже выполнен
			else
				numberInNewSystem = numberInSystem10;
			// Выводим число i в новой системе счисления
			process.stdout.write(String(numberInNewSystem));
		}
	//}
}

// Сохраняем значения аргументов командной строки, заданных в качестве параметров перевода из одной системы счисления в другую
var dataForTask1 = [process.argv[2], process.argv[3], process.argv[4]];

// и выводим число в новой системе счисления
convertNumber(...dataForTask1)
