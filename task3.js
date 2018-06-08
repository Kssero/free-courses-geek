function wrongArgs(vt1, vt2)
{
	
	if ((isNaN(vt1)) || (isNaN(vt2)))
		return 'Неправильно указан временной промежуток';
	else
	{
		vt1 = parseInt(vt1);
		vt2 = parseInt(vt2);
		if ((vt1 < 1) || (vt1 > 100000) || (vt2 < 1) || (vt2 > 100000))
			return 'Неправильно указан временной промежуток';
	}
	
	return 0;
}

function wordend(num, words)
{

	num = num%100;
	if (num > 20)
		num %= 10;
	
	return words[ (num > 4 || num === 0) + (num !== 1) ];
}


function sumTime(t1, t2)
{	
	
	const checkArguments = wrongArgs(t1, t2);
	
	if (checkArguments !== 0)
	{
		
		process.stdout.write(checkArguments);
	}
	
	else
	{
		t1 = parseInt(t1);
		t2 = parseInt(t2);

		
		const t = t1 + t2;

		const h = Math.floor(t/3600);
	
		const m = Math.floor((t - 3600*h)/60);
		
		const s = t - 3600*h - 60*m;

		
		const hoursArray = ['час', 'часа', 'часов'];
		const minutesArray = ['минута', 'минуты', 'минут'];
		const secondsArray = ['секунда', 'секунды', 'секунд'];

	
	
	if ((m === 0) && (s === 0))
	
		process.stdout.write(String(h + ' ' + wordend(h, hoursArray)));
	else
		
		if ((h !== 0) && (s === 0))
			
			process.stdout.write(String(h + ' ' + wordend(h, hoursArray) + ' ' + m + ' ' + wordend(m, minutesArray)));
		else
		
			if (s === 0)
			
				process.stdout.write(String(m + ' ' + wordend(m, minutesArray)));
			else
				
				if ((h !== 0) && (m !== 0))
					
					process.stdout.write(String(h + ' ' + wordend(h, hoursArray) + ' ' + m + ' ' + wordend(m, minutesArray) + ' ' + s + ' ' + wordend(s, secondsArray)));
				else
					
					if (h !== 0)
						
						process.stdout.write(String(h + ' ' + wordend(h, hoursArray) + ' ' + s + ' ' + wordend(s, secondsArray)));
					else
						if (m !== 0)
							
							process.stdout.write(String(m + ' ' + wordend(m, minutesArray) + ' ' + s + ' ' + wordend(s, secondsArray)));
						else
							
							process.stdout.write(String(s + ' ' + wordend(s, secondsArray)));
	}
}


var dataForTask3 = [process.argv[2], process.argv[3]];


sumTime(...dataForTask3);
